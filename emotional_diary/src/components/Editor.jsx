import "./Editor.css";
import EmotionItem from "./EmotionItem.jsx";
import Button from "./Button.jsx";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 이미지 정보
import { emotionList} from "../util/constants.js";

// 유틸
import { getStringedDate } from "../util/get-stringed-date.js"

// 감정 정보 리스트
// const emotionList = [
//     {
//         emotionId:1,
//         emotionName: "완전 좋음"
//     },
//     {
//         emotionId:2,
//         emotionName: "좋음"
//     },
//     {
//         emotionId:3,
//         emotionName: "그러저럭"
//     },
//     {
//         emotionId:4,
//         emotionName: "나쁨"
//     },
//     {
//         emotionId:5,
//         emotionName: "끔찍함"
//     }
// ];

// // 날짜를 문자열로 변경
// const getStringedDate = (targetDate) => {
//     // 받은 날짜를 YYYY-MM-DD 형태로 만들어 준다 (09 09)
//     let year = targetDate.getFullYear();
//     let month = targetDate.getMonth()+1;
//     let date = targetDate.getDate();
//
//     if (month < 10) {
//         month = `0${month}`;
//     }
//     if (date < 10) {
//         date = `0${date}`;
//     }
//
//     return `${year}-${month}-${date}`;
// }

const Editor = ({initData, onSubmit}) => {

    const [input, setInput] = useState({
        createdDate: new Date(),
        emotionId: 3,
        content: ""
    });
    
    // 내비게이션
    const nav = useNavigate();

    // 초기 데이터가 있는 경우 (수정하기)
    useEffect(() => {
        if (initData) {
            setInput({
                ...initData,
                createdDate: new Date(Number(initData.createdDate)),
            })
        }
    }, [initData]);


    // 날짜 변경 메소드
    const onChangeInput = (e) => {
        // createdDate 날짜 객체이다 태그 값을 그대로 넣으려면 형변환이 필요 String -> Date
        let name = e.target.name;
        let value = e.target.value;

        if (name === 'createdDate') {
            value = new Date(value);
        }
        // 한번 처리 과정을 거치게 때문에 value 값을 바로 입력하지 않고 등록한다
        
        setInput({
            ...input,
            [name]:value
        });
    }
    
    // "작성완료" 버튼의 경우 글쓰기, 글수정에서 공통으로 사용하는 컴포넌트이기 때문에 하나의 버튼이 페이지마다 다른 기능을 가져야 한다
    const onClickSubmitButton = () => {
        onSubmit(input);
    };
    
    return (
        <div className={"Editor"}>
            <section className="date_section">
                <h4>오늘의 날짜</h4>
                <input name="createdDate"
                       onChange={onChangeInput}
                       value={getStringedDate(input.createdDate)}
                       type={"date"} />
            </section>

            <section className="emotion_section">
                <h4>오늘의 감정</h4>
                <div className={"emotion_list_wrapper"}>
                    {emotionList.map((item) =>
                        <EmotionItem
                            key={item.emotionId}
                            {...item}
                            isSelected={item.emotionId === input.emotionId}
                            onClick={()=>onChangeInput({
                                target : {
                                    name: "emotionId",
                                    value: item.emotionId,
                                }
                            })}/>
                    )}
                </div>
            </section>

            <section className="content_section">
                <h4>오늘의 일기</h4>
                <textarea
                    name={"content"}
                    value={input.content}
                    onChange={onChangeInput}
                    placeholder={"오늘은 어땠나요?"} />
            </section>

            <section className="button_section">
                <Button text={"취소하기"}
                        onClick={ () => nav(-1)}/>
                <Button
                    onClick={onClickSubmitButton}
                    text={"작성완료"} type={"POSITIVE"}/>
            </section>
        </div>
    );
}

export default Editor;