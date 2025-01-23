import React, { useState } from 'react';
import styles from '../css/RatingTool.module.css';

const RatingTool = () => {
    const totalStars = 5;
    const [selectedRating, setSelectedRating] = useState(0);

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

export default RatingTool;
