import "./List.css";
import TodoItem from "./TodoItem"
import {useState} from "react";

const List = ({todos, onUpdate, onDelete}) => {

    const [search, setSearch] = useState("");

    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    };

    // todo 제목 필터링 
    const getFilteredData = () => {
        if (search === "") { // 검색어가 없는 경우
            return todos;
        }

        // 검색어가 있는경우
        return todos.filter((todo) =>
            todo.content.toLowerCase().includes(search.toLowerCase())
        );
        // 이렇게 작성할 수 도 있음
        // return todos.filter((todo) => {
        //     return todo.content.includes(search)
        // });
    }

    const filteredTodos = getFilteredData();

    return (
        <div className={"List"}>
            <h4>Todo List 📗</h4>
            <input
                value={search}
                onChange={onChangeSearch}
                placeholder={"검색어를 입력하세요"}/>

            <div className="todos_wrapper">
                {
                    filteredTodos.map((todo) => {
                        return <TodoItem
                            // 반복문 사용시 객체의 구분자가 필요하다
                                    key={todo.id}
                                    {...todo}
                            // 이벤트 핸들러 전달
                                    onUpdate={onUpdate} 
                                    onDelete={onDelete} />
                    })
                }
            </div>
        </div>
    );
}

export default List;