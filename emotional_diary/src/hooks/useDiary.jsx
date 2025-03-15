import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App.jsx";
import { useNavigate } from "react-router-dom";

const useDiary = (id) => {
    const data = useContext(DiaryStateContext);
    const [curDiaryItem, setCurDiaryItem] = useState();

    const nav = useNavigate();

    // nav 기능 사용
    useEffect(() => {
        // 일기 정보 조회
        const currentDiaryItem = data.find(
            (item) => String(item.id) === String(id)
        );

        // 일기 정보가 없는 경우 ( 조작된 접근 )
        if (!currentDiaryItem) {
            window.alert("존재하지 않는 일기입니다");
            nav("/", {replace: true}); // 컴포넌트가 생성되기 전에는 nav 가 동작할 수없다 (mount 되기 전에 동작X)
        }

        setCurDiaryItem(currentDiaryItem); // state 에 보관하도록 한다
    }, [id]);

    return curDiaryItem;
}

export default useDiary;