import { useParams } from "react-router-dom"; // 동적 경로 id 설정

// 일기장 상세 정보를 확인하는 페이지를 렌더링
const Diary = () => {
    const params = useParams(); // 동적 경로 id 설정
    console.log(params);

    return (
        <div>
            {params.id}번 일기입니다
        </div>
    );
};

export default Diary;