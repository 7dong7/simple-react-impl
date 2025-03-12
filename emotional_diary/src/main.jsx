import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"; // 브라우저 라우터 임포트

/* <BrowserRouter> 브라우저의 변화를 감지할 수 있고 브라우저의 주소를 사용할 수 있게됨 */
createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
)
