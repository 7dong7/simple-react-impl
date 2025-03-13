import { useState } from 'react'
import './App.css'
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import New from "./pages/New";

// 경로 요청에 해당하는 응답페이지 설정가능한
                    // Link, useNavigate 둘다 클라이언트 사이드 렌덜이 방식이다
import { Routes, Route, Link, useNavigate } from "react-router-dom";
// 올바르지 않은 경로에 대한 응답
import Notfound from "./pages/Notfound.jsx";

/**
 *  이미지는 assets 안에 폰트는 public 안에 넣었다
 *  vite가 실행하는 이미지 최적화 기능 때문에 구분해서 넣어줫다
 */
// util 파일로 이동
// // 이미지 불러오기
// import emotion1 from './assets/emotion1.png';
// import emotion2 from './assets/emotion2.png';
// import emotion3 from './assets/emotion3.png';
// import emotion4 from './assets/emotion4.png';
// import emotion5 from './assets/emotion5.png';

// util 이미지 불러오기
import { getEmotionImage } from "./util/get-emotion-image.js";

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
                {/* assets 에서 이미지를 불러올 경우 이미지 최적화가 된다
                    자동으로 사용자 pc에 캐싱되도록 암호화 설정 된다 (새로고침해도 다시 불러오지 않음) */}
                <img src={getEmotionImage(1)}/>
                <img src={getEmotionImage(2)}/>
                <img src={getEmotionImage(3)}/>
                <img src={getEmotionImage(4)}/>
                <img src={getEmotionImage(5)}/>
            </div>
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
