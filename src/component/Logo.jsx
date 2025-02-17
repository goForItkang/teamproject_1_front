import styles from "../css/logo.module.css";


export const LoginLogo = () => {
    return(
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