import { useEffect } from "react";

const usePageTitle = (title) => {
    // 페이지에 따라서 타이틀을 수정시키기 위한 방법 (컴포넌트가 마운트 된 이후에 실행)
    useEffect(() => {
        // "$" 를 붙이는 이유: 관례상 DOM 요소가 들어있는 변수는 $를 붙인다
        const $title = document.getElementsByTagName("title")[0];
        $title.innerText = title;
    }, [title]);
    // [] => 페이지가 렌더링 된 후 에실행 (마운트 될 때)
    // [title] => title 값이 변경되면 (업데이트)
}

export default usePageTitle;