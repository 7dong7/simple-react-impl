import { useParams } from "react-router-dom"; // 동적 경로 파라미터 받기

const Edit = () => {
    const params = useParams(); //


    /* 경로 페이지값 "edit/23" 에서 "23"의 값을 얻을 수 있다 */
    return (
        <div>
            {params.id}번 일기 수정 페이지입니다.
        </div>
    );
}

export default Edit;