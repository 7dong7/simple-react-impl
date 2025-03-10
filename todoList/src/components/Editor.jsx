import "./Editor.css"
import { useState, useRef } from "react";

const Editor = ({onCreate}) => {

    const [content, setContent] = useState("");
    const contentRef = useRef();

    // input 태그 값이 바뀔 때 이벤트
    const onChangeContent = (e) => {
        setContent(e.target.value);
    }

    // enter 를 치면 발생하는 이벤트
    const onKeyDown = (e) => {
        if (e.keyCode === 13) {
            onSubmit();
        }
    }
    
    const onSubmit = () => {
        if (content === "") {
            contentRef.current.focus();
            return;
        }
        onCreate(content);
        setContent("");
    }

    
    return (
        <div className={"Editor"}>
            <input
                ref={contentRef}
                value={content}
                onKeyDown={onKeyDown}
                onChange={onChangeContent}
                placeholder={"새로운 todo..."}/>
            <button onClick={onSubmit}>추가</button>
        </div>
    );
}

export default Editor;