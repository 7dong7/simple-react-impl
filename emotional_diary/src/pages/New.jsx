import Header from "../components/Header.jsx";
import Button from "../components/Button.jsx";
import Editor from "../components/Editor.jsx";

// 네비게이션
import { useNavigate } from "react-router-dom";

// context
import {useContext} from "react";
import { DiaryDispatchContext } from "../App.jsx";

// 새로운 일기장을 작성하는 페이지
const New = () => {
    const { onCreate } = useContext(DiaryDispatchContext);
    const nav = useNavigate()

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