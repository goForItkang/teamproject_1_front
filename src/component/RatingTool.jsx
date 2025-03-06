
import styles from '../css/RatingTool.module.css';
import {FaStar} from "react-icons/fa6";
import {useEffect, useState} from "react";
import {  FaStarHalfAlt } from "react-icons/fa";

export const RatingTool = ({ selectedRating, setSelectedRating }) => {
    const totalStars = 5;


    const renderStars = () => {
        return Array.from({ length: totalStars }, (_, index) => {
            const starValue = index + 1;
            return (
                <button
                    key={starValue}
                    className={
                        starValue <= selectedRating
                            ? `${styles.starButton} ${styles.selected}`
                            : styles.starButton
                    }
                    aria-label={`${starValue} star`}
                    onClick={() => setSelectedRating(starValue)}
                >
                    ★
                </button>
            );
        });
    };

    return (
        <div>
            <div className={styles.starRating}>{renderStars()}</div>
        </div>
    );
};

const Star = ({index,selectedStars , size,onSelect = f => f }) => {

    const yellow = "F7E509"
    const grey = "F4F5F6";
    const [isHalf, setIsHalf] = useState(false);
    const [isFull, setIsFull] = useState(false)

    useEffect( () => {
        if(index + 0.5 > selectedStars){
            setIsHalf(false)
            setIsFull(false)
        }
    },[selectedStars])

    const handleSelect = (event) => {
        // console.log('index : ' + index)

        const element = event.target; // 클릭된 아이콘
        const rect = element.getBoundingClientRect(); // 요소의 좌표 정보 가져오기

        const offsetX = event.clientX - rect.left; // 클릭된 위치의 상대 X 좌표
        const width = rect.width; // 아이콘의 너비


        let newRating;
        if(offsetX <= width/2){
            setIsFull(false);
            setIsHalf(true)
            newRating = index + 0.5
        }else{
            setIsFull(true)
            setIsHalf(false)
            newRating = index + 1
        }
        onSelect(newRating);
    };

    if(index + 1 < selectedStars || (isFull)){
        return (
            <>
                <FaStar
                    className={styles.star}
                    color={yellow}
                    size={size}
                    onClick={(e) => {
                        handleSelect(e);
                        // onSelect(e)
                    }}
                />
            </>
        )
    }



    return(
        <>
            {
                isHalf === true ?
                (
                    <FaStarHalfAlt
                    className={styles.star}
                    color={yellow}
                    size={size}
                    onClick={(e) => {
                        handleSelect(e);
                        // onSelect(e)
                    }}
                    />
                ) :
                (
                    <FaStar
                        className={styles.star}
                        color={grey}
                        size={size}
                        onClick={(e) => {
                            handleSelect(e);
                            // onSelect(e)
                        }}
                    />
                )
            }
        </>
    )

};

const createArray = (length) => [...Array(length)];

export const StarRating = ({selectedStars, setSelectedStars, totalStars = 5, size = 25 }) => {

    // const [selectedStars, setSelectedStars] = useState(0);

    return (
        <>
            <div>
                {createArray(totalStars).map((n, i) => (
                    <Star
                        key={i}
                        index={i}
                        selectedStars={selectedStars}
                        onSelect={(rating) => setSelectedStars(rating)}
                        size={size}
                    />
                ))}
            </div>
        </>
    );
}



export default RatingTool;
