import './Button.css';

// 공통 컴포넌트 개발 (버튼)
const Button = ({text, type, onClick}) => {
    return (
        <button onClick={onClick} className={`Button Button_${type}`}>
            {text}
        </button>
    );
}

export default Button;