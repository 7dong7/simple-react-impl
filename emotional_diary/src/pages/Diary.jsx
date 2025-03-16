import { useParams, useNavigate } from "react-router-dom"; // 동적 경로 id 설정

// 컴포넌트
import Header from "../components/Header.jsx";
import Button from "../components/Button.jsx";
import Viewer from "../components/Viewer.jsx";

// 커스텀 훅
import useDiary from "../hooks/useDiary.jsx";
import usePageTitle from "../hooks/usePageTitle.jsx"; // 탭 이름 변경

// 유틸 함수
import { getStringedDate } from "../util/get-stringed-date.js";

// 일기장 상세 정보를 확인하는 페이지를 렌더링
const Diary = () => {
    const params = useParams(); // 동적 경로 id 설정
    const nav = useNavigate();

    usePageTitle(`${params.id}번 일기`);


    const curDiaryItem = useDiary(params.id);

    if (!curDiaryItem) {
        return <div>데이터 로딩중...</div>
    }

    const {createdDate, emotionId, content} = curDiaryItem;
    const title = getStringedDate(new Date(createdDate));


    return (
        <div>
            <Header
                title={`${title} 기록`}
                leftChild={
                    <Button
                        onClick={()=>nav(-1)}
                        text={"< 뒤로 가기"}/>
                }
                rightChild={
                    <Button
                        onClick={() => nav(`/edit/${params.id}`)}
                        text={"수정하기"}/>
                }/>

            <Viewer emotionId={emotionId} content={content}/>
        </div>
    );
};

export default Diary;