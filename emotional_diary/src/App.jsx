import { useState } from 'react'
import './App.css'
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import New from "./pages/New";

// 경로 요청에 해당하는 응답페이지 설정가능한
                    // Link, useNavigate 둘다 클라이언트 사이드 렌덜이 방식이다
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Notfound from "./pages/Notfound.jsx";

// 올바르지 않은 경로에 대한 응답

/**
 *  1. "/": 모든 일기를 조회하는 Home 페이지
 *  2. "/new": 새로운 일기를 작성하는 New 페이지
 *  3. "/diary": 일기를 상세히 조회하는 Diary 페이지
 */
function App() {
    // useNavigate - 네비게이션 선언
    const nav = useNavigate();

    // useNavigate - 네비게이션 클릭 이벤트 발생
    const onClickButton = () => {
        nav("/new");
    };
    /**
     *  아래에서 작성한 Routes 컴포넌트의 경우
     *      현재의 경로를 Routes 컴포넌트에 등록된 Route 에서 찾는다
     *      현재의 경로와 path 와 일치되는 컴포넌트를 음답해준다
     *      Routes 컴포넌트 안에는 route 컴포넌트만 들어갈 수 있다
     *  
     *  경로가 없는경우 없는 경로라는 콘솔경고가 뜬다
     *      경로가 없는 Notfound.jsx 새로 정의 - 예를 들어서 /asdmd 같은 없는 경로에 대한 페이지이다
     *
     *  Link 의 경우 ( a태그 대안 )
     *      <a> 와 같이 비슷하게 페이지를 이동시킨다
     *      그렇지만 클라이언트 사이드 렌더링 방식으로 응답한다
     *
     *  동적 경로 (Dynamic Segments)
     *      id명시: products/1, products/2, products/3, ...
     *      ?명시: products/search?q=검색
     */
    return (
        <>
            <div>
                <Link to={"/"}>Home</Link>
                <Link to={"/new"}>New</Link>
                <Link to={"/diary"}>Diary</Link>
                <br/>
                <a href={"/"}>Home</a>
                <a href={"/new"}>New</a>
                <a href={"/diary"}>Diary</a>
                <br/>
                <button onClick={onClickButton}>{/* useNavigate 버튼 이벤트 */}
                    New 페이지 이동
                </button>
            </div>

            <Routes> {/* 경로를 설정하기 위해서 Routse 사용*/}
                <Route path="/" element={<Home />} />
                <Route path="/new" element={<New />} />
                {/*<Route path="/diary" element={<Diary />} />*/}
                <Route path="/diary/:id" element={<Diary />} />
                <Route path="*" element={<Notfound />} /> {/* 모든 경로에 대해서 응답 - 엉뚱한 요청에 대한 응답 */}
            </Routes>
        </>
)
}

export default App
