import styles from "../css/submitButton.module.css";
import React from "react";


export const SubmitButton = ({isSubmitPossible, buttonName}) => {

    const submitStyle = () => {
        if(isSubmitPossible() === true) return "ableButton"
        return "disableButton"

    }


    return (
        <button type = "submit" className={styles[submitStyle()]}>
            <b className={styles.b}>{buttonName}</b>
        </button>
    )
}

