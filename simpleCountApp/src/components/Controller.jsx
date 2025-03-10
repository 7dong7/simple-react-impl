// 카운트 앱 컨트롤러
const Controller = ({onClickButton}) => {

    const buttonValues = [-1, -10, -100, 100, 10, 1];

    return (
        <div>
            {buttonValues.map((value) => (
                <button
                    key={value} // 각 버튼마다 key 를 부여
                    onClick={() => onClickButton(value)} // 버튼 클릭시 value 를 파라미터로 전달
                >
                    {value > 0 ? `+${value}` : value}
                </button>
            ))}
        </div>
    );
};

export default Controller;