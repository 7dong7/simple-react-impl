import './App.css'
import Header from './components/Header';
import Editor from './components/Editor';
import List from './components/List';

import { useState, useRef } from "react";

// 임시 데이터 생성
const mockData = [
    {
        id:0,
        isDone: false,
        content: "React 공부하기",
        date: new Date().getTime(),
    },
    {
        id:1,
        isDone: false,
        content: "운동하기",
        date: new Date().getTime(),
    },
    {
        id:2,
        isDone: false,
        content: "Java 공부하기",
        date: new Date().getTime(),
    }
]


function App() {
    // todo 작업
    const [todos, setTodos] = useState(mockData); // 초기값 빈 데이터
    const idRef = useRef(3);

    // 새로운 todo 생성하고 todoList 에 추가하기
    const onCreate = (content) => {
        const newTodo = {
            id: idRef.current++,
            isDone: false,
            content: content,
            date: new Date().getTime(),
        }

        setTodos([newTodo, ...todos]);
    };

    // 체크박스 값 변경하기 (todo 값 변경하기)
    const onUpdate = (targetId) => {
        // todos State 의 값들 중에
        // target Id 와 일치하는 값을 갖는 todo 아이템의 isDone 변경
        
        // 인수: todos 배열에서 targetId와 일치하는 id를 갖는 요소의 데이터만 딱 바꾼 새로운 배열
        setTodos(
            todos.map((todo)=>
                todo.id === targetId
                    ? {...todo, isDone: !todo.isDone}
                    : todo )
        );
    }
    
    // todo 삭제하기
    const onDelete = (targetId) => {
        // todos 배열에서 targetId와 일치하는 Id를 갖는 요소만 삭제한 배열을 넣어주면 된다
        setTodos(
            todos.filter((todo)=> todo.id !== targetId) // 같지 않는 todo 만 반환
        )
    }

  return (
    <div className={"App"}>
        <section>
            <Header />
        </section>

        <section>
            <Editor onCreate={onCreate}/>
        </section>

        <section>
            <List todos={todos} onUpdate={onUpdate} onDelete={onDelete}/>
        </section>
    </div>
  )
}

export default App
