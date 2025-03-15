import {useEffect, useState} from 'react'
import './App.css'

// === pages
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import New from "./pages/New";
import Edit from "./pages/Edit";

// === components
import Button from "./components/Button";
import Header from "./components/Header";

// 경로 요청에 해당하는 응답페이지 설정가능한
                    // Link, useNavigate 둘다 클라이언트 사이드 렌덜이 방식이다
import { Routes, Route, Link, useNavigate } from "react-router-dom";
// 올바르지 않은 경로에 대한 응답
import Notfound from "./pages/Notfound.jsx";

// 필요 훅
import { useReducer, useRef, createContext } from "react";


// util 이미지 불러오기
import { getEmotionImage } from "./util/get-emotion-image.js";


// 초기 샘플링 데이터 추가하기 - 임시 일기 데이터
// const mockData = [
//     {
//         id: 1,
//         createdDate: new Date("2025-03-20").getTime(),
//         emotionId: 1,
//         content: "1번 일기 내용"
//     },
//     {
//         id: 2,
//         createdDate: new Date("2025-03-19").getTime(),
//         emotionId: 2,
//         content: "2번 일기 내용"
//     },
//     {
//         id: 3,
//         createdDate: new Date("2025-02-11").getTime(),
//         emotionId: 3,
//         content: "3번 일기 내용"
//     }
// ]

export const DiaryStateContext = createContext(); // data context
export const DiaryDispatchContext = createContext(); // 함수 context

// === 외부 함수 관리
function reducer(state, action) {
    // 로컬 스토리지를 활용한 데이터 저장 방법
    let nextState;
    
    switch (action.type) {
        case 'INIT':
            return action.data; // 바로 리턴하는 경우 localStorage 에 저장할 이유가 없는 경우
        case 'CREATE': {
            nextState = [action.data, ...state]
            break;
        }
        case 'UPDATE': {
            nextState = state.map((item) =>
                String(item.id) === String(action.data.id) ? action.data : item);
            break;
        }
        case 'DELETE': {
                                    // 삭제하고자 하는 id와 action.id 가 같으면 제외
            nextState = state.filter((item) => String(item.id) !== String(action.id));
            break;
        }
        default:
            return state;
    }
    localStorage.setItem("diary", JSON.stringify(nextState));
    return nextState;
}

// 랜더링의 순서에 따라서 오류가 발생할 수 있다 (로딩기능 필요)
function App() {
    // 로딩 상태
    const [isLoading, setIsLoading] = useState(true);
    // const [data, dispatch] = useReducer(reducer, mockData); // 함수 외부에서 관리
    const [data, dispatch] = useReducer(reducer, []); // 초기값 없애기
    const idRef = useRef(0);

    useEffect(() => {
        const storedData = localStorage.getItem("diary");

        if(!storedData){ // null 오류 발생
            setIsLoading(false);
            return;
        }
        const parsedData = JSON.parse(storedData);

        if (!Array.isArray(parsedData)) { // 배열이 아닌 경우 리턴
            setIsLoading(false);
            return;
        }

        let maxId = 0;
        parsedData.forEach((item)=>{
            if (Number(item.id) > maxId) {
                maxId = Number(item.id); // 일기 중에 가장 높은 id값을 사용
            }
        })
        idRef.current = maxId + 1;

        dispatch({
            type: "INIT",
            data: parsedData
        });
        setIsLoading(false);
    }, []); // 빈 배열 컴포넌트가 마운트(생성) 되었을 경우에 한번 호출
    
// 새로운 일기 추가
    const onCreate = (createdDate, emotionId, content) => {
        console.log("새로운 일기 작성");
        // 새로운 일기를 추가하는 기능
        dispatch({
            type:"CREATE",
            data: {
                id: idRef.current++,
                createdDate,
                emotionId,
                content,
            }
        });
    }
// 기존 일기 수정
    const onUpdate = (id, createdDate, emotionId, content) => {
        console.log("기존 일기 수정");
        dispatch({
            type: "UPDATE",
            data:{
                id,
                createdDate,
                emotionId,
                content,
            }
        });
    }
// 기존 일기 삭제
    const onDelete = (id) => {
        console.log("기존 일기 삭제");
        dispatch({
            type: "DELETE",
            id,
        })
    }

    // 데이터 로딩 설정
    if (isLoading) {
        return <div>데이터 로딩중 입니다...</div>
    }

    return (
        <>
            <DiaryStateContext.Provider value={data}>
                <DiaryDispatchContext.Provider value={{
                    onDelete, onUpdate, onCreate
                }}>
                    <Routes> {/* 경로를 설정하기 위해서 Routse 사용*/}
                        <Route path="/" element={<Home/>}/>
                        <Route path="/new" element={<New/>}/>
                        {/*<Route path="/diary" element={<Diary />} />*/}
                        <Route path="/diary/:id" element={<Diary/>}/>
                        <Route path="/edit/:id" element={<Edit />}/>
                        <Route path="*" element={<Notfound/>}/> {/* 모든 경로에 대해서 응답 - 엉뚱한 요청에 대한 응답 */}
                    </Routes>
                </DiaryDispatchContext.Provider>
            </DiaryStateContext.Provider>
        </>
    );
}

export default App
