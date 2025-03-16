import { useSearchParams } from "react-router-dom"; // 쿼리스트링 받는방법
import Header from "../components/Header.jsx";
import Button from "../components/Button.jsx";
import DiaryList from "../components/DiaryList.jsx";

// hook
import { useState, useContext } from "react";

// 커스텀 훅
import usePageTitle from "../hooks/usePageTitle.jsx"; // 탭 이름 변경

// context
import { DiaryStateContext } from "../App.jsx";


// 선택된 달에 해당하는 데이터만 출력
const getMonthlyData = (pivotDate, data) => {
    // 달의 시작
    const beginTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth(), 1, 0, 0, 0).getTime();
    // 달의 끝 - 다음 달의 0일로 설정하면 그 전달의 마지막날로 설정된다
    const endTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1, 0, 23, 59, 59).getTime();

    return data.filter((item) => beginTime <= item.createdDate && item.createdDate <= endTime)
}


// 메인 페이지를 렌더링
const Home = () => {
    const data = useContext(DiaryStateContext);
    const [pivotDate, setPivotDate] = useState(new Date()); // 날짜 state

    usePageTitle("감정 일기장");

    // 월별로 날짜를 이동시키는 기능
    const onIncreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1))
    }
    const onDecreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1))
    }

    const monthlyData = getMonthlyData(pivotDate, data);

    return (
        <div>
            <Header
                title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth()+1}월`}
                leftChild={<Button text={"<"} onClick={onDecreaseMonth}/>}
                rightChild={<Button text={">"} onClick={onIncreaseMonth}/>} />
            <DiaryList data={monthlyData}/>
        </div>
    );
};

export default Home;