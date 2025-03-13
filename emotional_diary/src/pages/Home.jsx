import { useSearchParams } from "react-router-dom"; // 쿼리스트링 받는방법

// 메인 페이지를 렌더링
const Home = () => {
    const [params, setParams] = useSearchParams(); // 쿼리스트링 받는방법

    return (
        <div>
            home
        </div>
    );
};

export default Home;