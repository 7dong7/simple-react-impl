import { useState } from 'react'
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
const mockData = [
    {
        id: 1,
        createDate: new Date().getTime(),
        emotionId: 1,
        content: "1번 일기 내용"
    },
    {
        id: 2,
        createDate: new Date().getTime(),
        emotionId: 2,
        content: "2번 일기 내용"
    }
]

const DiaryStateContext = createContext(); // data context
const DiaryDispatchContext = createContext(); // 함수 context

// === 외부 함수
function reducer(state, action) {
    switch (action.type) {
        case 'CREATE':
            return [action.data, ...state];
        case 'UPDATE':
            return state.map((item)=>
                                String(item.id) === String(action.data.id) ? action.data : item)
        case 'DELETE':
                                    // 삭제하고자 하는 id와 action.id 가 같으면 제외
            return state.filter((item) => String(item.id) !== String(action.id));
    }
}

function App() {
    const [data, dispatch] = useReducer(reducer, mockData); // 함수 외부에서 관리
    const idRef = useRef(3);
    
// 새로운 일기 추가
    const onCreate = (createDate, emotionId, content) => {
        console.log("새로운 일기 작성");
        // 새로운 일기를 추가하는 기능
        dispatch({
            type:"CREATE",
            data: {
                id: idRef.current++,
                createDate,
                emotionId,
                content,
            }
        });
    }
// 기존 일기 수정
    const onUpdate = (id, createDate, emotionId, content) => {
        console.log("기존 일기 수정");
        dispatch({
            type: "UPDATE",
            data:{
                id,
                createDate,
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

    return (
        <>
            <button onClick={() => {
                onCreate(new Date().getTime(), 1, "hello")
            }}>
                일기 추가 테스트
            </button>
            <button onClick={() => {
                onUpdate(1, new Date().getTime(), 3, "수정된 일기입니다");
            }}>
                일기 수정 테스트
            </button>
            <button onClick={() => {
                onDelete(1);
            }}>
                일기 삭제 테스트
            </button>
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
