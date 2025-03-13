import {useEffect, useState} from "react";
import styles from '../css/share.module.css';
import {ShareKakao} from "../api/KakaoApi";
// import {ShareKakao} from "../api/KakaoApi";

export const ShareButton = ({item}) => {
    const [isClick, setIsClick] = useState(false)


    return(
        <>

            <img
                className={styles['share-icon']}
                src={'/images/-icon-share.svg'}
                onClick={() => setIsClick(true)}
            />

            {
                isClick &&
                <div className={styles['share-container']}>
                    <ShareForm
                        item={item}
                        setIsClick={setIsClick}
                    />
                </div>
            }
        </>
    )
}

const ShareForm = ({item, setIsClick}) => {

    const copyUrl = () => {
        const currentUrl = window.location.href; // 현재 URL 가져오기

        // 클립보드에 현재 URL 복사
        navigator.clipboard.writeText(currentUrl).then(() => {
            alert('링크 복사가 완료되었습니다')
        }).catch((error) => {
            alert("URL 복사 실패: " + error);
        });
    };


    return(
        <>
            <div className={styles['share-box']}>
                <div className={styles['share-box__title']}>
                    공유하기

                    <img
                        className={styles['share-box__close']}
                        src={'/images/-icon-close.svg'}
                        onClick={() => setIsClick(false)}
                    />
                </div>
                <div className={styles['share-box__body']}>
                    <div className={styles['share-box__item-container']}>
                        <img
                            className={styles['share-box__img']}
                            src={item.itemImg}
                        />
                        <div>
                            <div>
                                {item.itemBrand}
                            </div>
                            <div className={styles['share-box__name-font']}>
                                {item.itemName}
                            </div>
                        </div>
                    </div>
                    <div className={styles['share-box__button-container']}>
                        <button
                            className={styles['share-box__button-link']}
                            onClick={() => copyUrl()}
                        >
                            <img
                                src={'/images/-icon-clip.svg'}
                            />
                            링크 복사
                        </button>
                        <button
                            className={styles['share-box__button-kakao']}
                            onClick = {() => ShareKakao(item)}
                        >
                            <img
                                src={'/images/-icon-kakao.svg'}
                            />
                            카카오톡 공유
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}


