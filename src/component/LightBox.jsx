import React, {useState} from "react";
import styles from '../css/lightBox.module.css';

export const LightBox = ({imageUrls}) => {
    const [isClick, setIsClick] = useState(false)

    return(
        <>
            <div>
                <img
                    className={styles['light-box__title-picture']}
                    src={imageUrls[0]}
                    onClick={()=>setIsClick(true)}
                />
                {
                    isClick === true &&
                    <div
                        className={styles['light-box-container']}
                        onClick={() => setIsClick(false)}
                    >
                        <FocusImage
                            imageUrls={imageUrls}
                        />
                    </div>
                }
            </div>
        </>
    )
}

const FocusImage = ({imageUrls}) => {
    const [imageIndex, setImageIndex] = useState(0);


    return(
        <>
            <div className={styles['light-box__image--focus']}>


                <img
                    className={imageIndex !== 0 ? styles['light-box__arrow'] : styles['light-box__arrow--hidden']}
                    src={'/images/-icon-arrow-left.svg'}
                    onClick={(e) => {
                        e.stopPropagation();
                        setImageIndex(imageIndex - 1)
                    }}
                />

                <div className={styles['light-box__picture-container']}>
                    <img
                        className={styles['light-box__picture']}
                        src={imageUrls[imageIndex]}
                        onClick={(e) => e.stopPropagation()}
                    />

                    <PageCircle
                        index={imageIndex}
                        maxIndex={imageUrls.length-1}
                    />
                </div>


                <img
                    className={imageIndex + 1 < imageUrls.length ? styles['light-box__arrow'] : styles['light-box__arrow--hidden']}
                    src={'/images/-icon-arrow-right.svg'}
                    onClick={(e) => {
                        e.stopPropagation();
                        setImageIndex(imageIndex + 1)
                    }}
                />


            </div>
        </>

    )
}

const PageCircle = ({index = 0, maxIndex}) => {

    return(
        <div className={styles['circle-container']}>
            {[...Array(maxIndex + 1)].map((_, i) => (
                <img
                    key={i}
                    src={index === i ? '/images/-icon-circle-fill.svg' : '/images/-icon-circle-none.svg'}
                    alt={`circle-${i}`}
                />
            ))}
        </div>
    )
}