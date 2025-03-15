// 날짜를 문자열로 변경
export const getStringedDate = (targetDate) => {
    // 받은 날짜를 YYYY-MM-DD 형태로 만들어 준다 (09 09)
    let year = targetDate.getFullYear();
    let month = targetDate.getMonth()+1;
    let date = targetDate.getDate();

    if (month < 10) {
        month = `0${month}`;
    }
    if (date < 10) {
        date = `0${date}`;
    }

    return `${year}-${month}-${date}`;
}