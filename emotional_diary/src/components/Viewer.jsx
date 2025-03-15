import "./Viewer.css";

// 감정 이미지
import { getEmotionImage } from "../util/get-emotion-image.js";

// 이미지 정고
import { emotionList } from "../util/constants.js";

const Viewer = ({emotionId, content, createDate}) => {

    const emotionItem = emotionList.find(
        (item) => String(item.emotionId) === String(emotionId)
    );

    return (
        <div className={"Viewer"}>
            <section className="img_section">
                <h4>오늘의 감정</h4>
                <div
                    className={`emotion_img_wrapper emotion_img_wrapper_${emotionId}`}
                >
                    <img src={getEmotionImage(emotionId)} />
                    <div>{emotionItem.emotionName}</div>
                </div>
            </section>
            
            <section className="content_section">
                <h4>오늘의 일기</h4>
                <div className={"content_wrapper"}>
                    <p>{content}</p>
                </div>
            </section>
        </div>
    );
}

export default Viewer;