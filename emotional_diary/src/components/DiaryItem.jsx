import {getEmotionImage} from "../util/get-emotion-image.js";

import Button from "./Button.jsx";

import "./DiaryItem.css";

import { useNavigate } from "react-router-dom"; // 네비게이션 사용

const DiaryItem = ({id, emotionId, createdDate, content}) => {
    // 네비게이션 호출
    const nav = useNavigate();

    return (
        <div className={"DiaryItem"}>
            <div
                className={`img_section img_section_${emotionId}`}
                onClick={()=>nav(`/diary/${id}`)} >
                <img src={getEmotionImage(emotionId)}/>
            </div>

            <div
                className={"info_section"}
                onClick={()=>nav(`/diary/${id}`)} >
                <div className={"create_date"}>
                    {new Date(createdDate).toLocaleDateString()}
                </div>
                <div className={"content"}>
                    {content}
                </div>
            </div>

            <div className={"button_section"}>
                <Button
                    text={"수정하기"}
                    onClick={()=>nav(`/edit/${id}`)} />
            </div>
        </div>
    );
}

export default DiaryItem;