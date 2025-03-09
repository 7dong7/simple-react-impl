import './App.css'
import Viewer from "./components/Viewer";
import Controller from "./components/Controller";
import {useState} from "react";

/**
 *  section으로 구분한 이유는 컴포넌트들 마다 다른 배경을 보여주기 위함이다
 *
 *  JSX 에서 class 가 아니라 className 을 사용하는 이유는
 *      자바스크립트에서 class 라는 단어가 클래스 선언에 사용되는 예약어이기 때문이다
 *      
 *  어디서 useState 를 선언해야 되는가?
 *  Viewer, Controller, App
 *  App 에서 구현해야 한다
 *      count 는 Viewer 컴포넌트로 보낸다
 *      onClickButton 함수를 만들어서 Controller 컴포넌트로 보낸다
 *
 *  컴포넌트끼리 값을 전해주고 변경하려면 서로 부모관계야 한다.
 *      App -> Viewer
 *      App -> Controller
 *      
 *      Viewer 와 Controller 와는 관계가 없다
 *  부모에서 자식한테만 state 를 전달할 수 있다 (State Lifting)
 */
function App() {
    const [count, setCount] = useState(0);

    const onClickButton = (value) => {
        setCount(count + value);
    };

  return (
    <div className={"App"}>
        <h1>Simple Counter</h1>
        <section>
            <Viewer count={count}/>
        </section>

        <section>
            <Controller onClickButton={onClickButton}/>
        </section>
    </div>
  )
}

export default App
