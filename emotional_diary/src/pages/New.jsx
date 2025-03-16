import Header from "../components/Header.jsx";
import Button from "../components/Button.jsx";
import Editor from "../components/Editor.jsx";

// 네비게이션
import { useNavigate } from "react-router-dom";

// context
import {useContext, useEffect} from "react";
import { DiaryDispatchContext } from "../App.jsx";

// 커스텀 훅
import usePageTitle from "../hooks/usePageTitle.jsx"; // 브라우저 탭 이름 변경 훅

// 새로운 일기장을 작성하는 페이지
const New = () => {
    const { onCreate } = useContext(DiaryDispatchContext);
    const nav = useNavigate()

    // // 페이지에 따라서 타이틀을 수정시키기 위한 방법 (컴포넌트가 마운트 된 이후에 실행)
    // useEffect(() => {
    //     // "$" 를 붙이는 이유: 관례상 DOM 요소가 들어있는 변수는 $를 붙인다
    //     const $title = document.getElementsByTagName("title")[0];
    //     $title.innerText = "새 일기 작성";
    // }, []); // 페이지가 렌더링 된 후 에실행
        // 대체 코드
    usePageTitle("새 일기 쓰기");
    
    
    /**
     *  props 로 onSubmit 함수를 넘겨준다
     *  그 이유는 컴포넌트를 재사용하는데 같은 버튼이 다른 기능을 각각 수행해야 되기 때문이다
     *  글작성 페이지 - 작성 버튼은 새로운 글 객체를 생성해야 되고
     *  글수정 페이지 - 작성 버튼은 기존의 글 객체의 값을 수정하는 기능을 해야되기 때문에
     *  
     *  기능을 editor 에서 구현하지 말고 여기서 각각 구현시키고 하위 컴포넌트에서 실행만 시킨다
     */
    const onSubmit = (input) => {
        onCreate(input.createdDate.getTime(), input.emotionId, input.content);
        nav("/", {replace: true}) // replace 옵션을 true => "/" 경로로 이동하면서, 뒤로가기 기능을 없애버림
    };

    return (
        <div>
            <Header
                title={"새 일기 쓰기"}
                leftChild={<Button text={"< 뒤로 가기"}
                onClick={() => nav(-1)}/>}
            />
            <Editor onSubmit={onSubmit}/>
        </div>
    );
};

export default New;