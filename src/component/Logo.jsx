import styles from "../css/logo.module.css";


export const LoginLogo = () => {
    return (
        <div className={styles.structure}>
            <div className={styles.structure1}>
                <div className={styles.structure2}>
                    <div className={styles.contentStructure}>
                        <div className={styles.rectangleParent}>
                            <div className={styles.frameChild}/>
                            <div className={styles.frameItem}/>
                            <div className={styles.frameInner}/>
                        </div>
                        <div className={styles.rectangleGroup}>
                            <div className={styles.rectangleDiv}/>
                            <div className={styles.frameChild1}/>
                            <div className={styles.frameInner}/>
                            <div className={styles.frameChild3}/>
                        </div>
                    </div>
                </div>
                <div className={styles.structure3}>
                    <a className={styles.health}>Health</a>
                    <div className={styles.structure4}>
                        <a className={styles.shop}>Shop</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const ForgotPasswordLogo = () => {
    return (
        <>
            <div className={styles.topNavigation}>
                <div className={styles.frameParent}>
                    <div className={styles.frameGroup}>
                        <div className={styles.navigationButtonsWrapper}>
                            <div className={styles.navigationButtons}>
                                <div className={styles.rectangleParent}>
                                    <div className={styles.frameChild}/>
                                    <div className={styles.frameItem}/>
                                    <div className={styles.frameInner}/>
                                </div>
                                <div className={styles.rectangleGroup}>
                                    <div className={styles.rectangleDiv}/>
                                    <div className={styles.frameChild1}/>
                                    <div className={styles.frameInner}/>
                                    <div className={styles.frameChild3}/>
                                </div>
                            </div>
                        </div>
                        <div className={styles.healthParent}>
                            <b className={styles.health}>Health</b>
                            <div className={styles.shopWrapper}>
                                <b className={styles.shop}>Shop</b>
                            </div>
                        </div>
                    </div>
                    <div className={styles.lineWrapper}>
                        <div className={styles.lineDiv}/>
                    </div>
                    <div className={styles.passwordResetLabel}>
                        <b className={styles.b}>비밀번호 찾기</b>
                    </div>
                </div>
            </div>
        </>
    )
}

