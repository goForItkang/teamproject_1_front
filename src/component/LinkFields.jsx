import styles from "../css/LinkFields.module.css";
import {Link} from "react-router-dom";
import React from "react";

export const LinkFieldPair = ({Link1, Link1Name, Link2, Link2Name}) =>{


    return(
        <>
            {/*회원가입, 비밀번호 찾기*/}
            <div className={styles.linksWrapper}>
                <div className={styles.links}>

                    <Link to={Link1} className={styles.linkFont}>
                        <div className={styles.linkLabels}>
                            <div>{Link1Name}</div>
                        </div>
                    </Link>

                    <div className={styles.linkLabels1}>
                        <div> · </div>
                    </div>

                    <Link to={Link2} className={styles.linkFont}>
                        <div className={styles.linkLabels}>
                            <div>{Link2Name}</div>
                        </div>
                    </Link>

                </div>
            </div>
        </>
    )
}

export const LinkLoginAndFindPassword = () =>{

    return(
        <>
            <LinkFieldPair
                Link1="/login"
                Link1Name="로그인"
                Link2="/user/password"
                Link2Name="비밀번호 찾기"
            />
        </>
    )
}