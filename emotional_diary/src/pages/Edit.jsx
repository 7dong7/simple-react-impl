import { useParams, useNavigate } from "react-router-dom"; // 동적 경로 파라미터 받기

// 컴포넌트
import Header from "../components/Header.jsx";
import Button from "../components/Button.jsx";
import Editor from "../components/Editor.jsx";

// 리액트 훅
import { useContext, useEffect, useState } from "react";
import { DiaryDispatchContext, DiaryStateContext } from "../App.jsx";

// 커스텀 훅
import useDiary from "../hooks/useDiary.jsx"; // 일기 작성
import usePageTitle from "../hooks/usePageTitle.jsx"; // 브라우저 탭 이름 변경 훅




const Edit = () => {
    const params = useParams(); //
    const nav = useNavigate();
    const {onDelete,onUpdate} = useContext(DiaryDispatchContext);

    usePageTitle(`${params.id}번 일기 수정`); // 일기 제목 변경

    // const data = useContext(DiaryStateContext);
    // const [curDiaryItem, setCurDiaryItem] = useState();
    //
    // // nav 기능 사용
    // useEffect(() => {
    //     // 일기 정보 조회
    //     const currentDiaryItem = data.find((item) => String(item.id) === String(params.id));
    //
    //     // 일기 정보가 없는 경우 ( 조작된 접근 )
    //     if (!currentDiaryItem) {
    //         window.alert("존재하지 않는 일기입니다");
    //         nav("/", {replace: true}); // 컴포넌트가 생성되기 전에는 nav 가 동작할 수없다 (mount 되기 전에 동작X)
    //     }
    //
    //     setCurDiaryItem(currentDiaryItem); // state 에 보관하도록 한다
    // }, [params.id]);
    const curDiaryItem = useDiary(params.id);
    
    // 일기장 삭제 기능
    const onClickDelete = () => {
        if (window.confirm("일기를 정말 삭제할까요? 다시 복구되지 않아요!")) {
        // 일기 삭제 로직
            onDelete(params.id);
            nav('/', {replace: true});
        }
    };

    /**
     *  submit 이벤트의 경우 Edit 에서는 수정
     *  New 에서는 생성의 기능으로 각각 구현되어 있다
     */
    const onSubmit = (input) => {
        if(window.confirm("일기를 정말 수정할까요?")) {
            onUpdate(params.id, input.createdDate.getTime(), input.emotionId, input.content);
        }
        nav("/", {replace: true})
    }

    /* 경로 페이지값 "edit/23" 에서 "23"의 값을 얻을 수 있다 */
    return (
        <div>
            <Header
                title={"일기 수정하기"}
                leftChild={
                    <Button onClick={() => nav(-1)} text={"< 뒤로 가기"}/>
                }
                rightChild={
                    <Button
                        onClick={onClickDelete}
                        text={"삭제하기"}
                        type={"NEGATIVE"}/>
                } />

            <Editor initData={curDiaryItem} onSubmit={onSubmit}/>
        </div>
    );
}

export default Edit;