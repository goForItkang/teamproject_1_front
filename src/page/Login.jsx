import styles from "../css/login.module.css";
import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

const Login = () => {
    return(
        <LoginForm/>
    )
}


const LoginForm = () => {
    const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
    const LOGIN_ENDPOINT = '/api/auth/login';
    const LOGIN_OAUTH2_ENDPOINT = '/api/login/oauth2';
    const GOOGLE_URL = `${BASE_URL}${LOGIN_OAUTH2_ENDPOINT}/google`
    const NAVER_URL = `${BASE_URL}${LOGIN_OAUTH2_ENDPOINT}/naver`
    const navigate = useNavigate();


    const [email, setEmail] = useState("")
    const [focusEmail, setFocusEmail] = useState(false);
    const [password, setPassword] = useState("")
    const [focusPassword, setFocusPassword] = useState(false)
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const [isFail, setIsFail] = useState(false);

    const getEmailImage = () => {
        if(isFail === true) return "/-icon-mail-fail.svg"
        else if(focusEmail === true || email !== "") return "/-icon-mail-fill.svg"
        else return "/-icon-mail-none.svg"

    }

    const getPasswordImage = () =>{
        if(isFail === true) return "/-icon-lock-fail.svg"
        else if(focusPassword === true || password !== "") return "/-icon-lock-fill.svg"
        else return "/-icon-lock-none.svg"

    }

    const getPasswordVisibleImage = () =>{
        if(isPasswordVisible) return "/-icon-password-visible.svg"
        else return "/-icon-password-hidden.svg"
    }

    const toggleIsPasswordVisible = () =>{
        setIsPasswordVisible(!isPasswordVisible)
    }

    const isSubmitPossible = () => {
        return (email !== "" && password !== "") ? "ableButton" : "disableButton"
    }



    // 폼 제출 처리 함수.
    const handleSubmit = async (e) => {
        e.preventDefault(); // 기본 폼 제출 방지

        // 폼 데이터를 수집
        const formData = new FormData(e.target);
        const json = Object.fromEntries(formData);

        try {
            // POST 요청 보내기
            const response = await fetch(`${BASE_URL}${LOGIN_ENDPOINT}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(json), // JSON 형식으로 변환된 데이터를 전송
                credentials: 'include'
            });

            if (response.ok) {
                // alert('로그인 성공.');
                setIsFail(false)
                navigate('/');
            } else {
                // alert('로그인 실패');
                setIsFail(true)
            }
        } catch (err) {
            console.error(err);
            alert('오류가 발생했습니다. 나중에 다시 시도해주세요.');
        }
    };


    return (
        <div className={styles.div}>


            <div className={styles.inner}>
                <div className={styles.frameParent}>
                    <div className={styles.frameWrapper}>
                        <div className={styles.frameGroup}>
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
            </div>


            {/*로그인 - 이메일, 비밀번호*/}
            <form onSubmit = {handleSubmit} className={styles.loginFormParent}>
                <div className={styles.loginForm}>

                    {/*이메일 입력*/}
                    <div className={isFail === true ? styles.emailFailureFields : styles.inputFields}>
                        <div className={styles.inputFieldsChild}/>
                        <div className={styles.iconFields}>
                            <img className={styles.iconMail} alt="" src={`/images${getEmailImage()}`}/>
                        </div>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className={styles.input}
                            placeholder={"이메일"}
                            value={email}
                            onFocus={() => setFocusEmail(true)}
                            onBlur={() => setFocusEmail(false)}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                        />
                    </div>


                    {/*비밀번호 입력*/}
                    <div className={isFail === true ? styles.passwordFailureFields : styles.inputFields1}>
                        <div className={styles.inputFieldsChild}/>
                        <div className={styles.iconLockParent}>
                            <img className={styles.iconLock} alt="" src={`/images${getPasswordImage()}`}/>
                            <input
                                className={styles.input}
                                type={isPasswordVisible ? "text" : "password"}
                                id="password"
                                name="password"

                                placeholder={"비밀번호"}
                                value={password}
                                onFocus={() => setFocusPassword(true)}
                                onBlur={() => setFocusPassword(false)}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {/*비밀번호 보기*/}
                        <div className={styles.groupWrapper}>
                            <img className={styles.groupIcon}
                                 alt=""
                                 src={`/images${getPasswordVisibleImage()}`}
                                 onClick={toggleIsPasswordVisible}
                            />
                        </div>
                    </div>

                    {/*로그인 실패 메시지*/}
                    {isFail === true &&
                        <div className={styles.healthParent}>
                            <div className={styles.div2}>
                                <ul className={styles.ul}>
                                    <li>이메일 또는 비밀번호가 잘못되었습니다.</li>
                                </ul>
                            </div>
                            <div className={styles.wrapper}>
                                <div className={styles.warningMessage2}>
                                    아이디와 비밀번호를 정확히 입력해 주세요.
                                </div>
                            </div>
                        </div>
                    }
                </div>

                {/*제출*/}
                <button className={styles[isSubmitPossible()]}>
                    {/*<div className={styles.frameChild4}/>*/}
                    <b className={styles.b}>로그인</b>
                </button>


            </form>

            {/*외부 로그인(OAuth2)*/}
            <div className={styles.testInner}>
                <div className={styles.ellipseParent}>

                    <Link to = {GOOGLE_URL}>
                        <img
                            className={styles.ellipseIcon}
                            loading="lazy"
                            alt=""
                            src="/images/-icon-google.png"
                        />
                    </Link>

                    <Link to = {NAVER_URL}>
                        <img
                            className={styles.ellipseIcon}
                            loading="lazy"
                            alt=""
                            src="/images/-icon-naver.png"
                        />
                    </Link>
                </div>
            </div>


            {/*회원가입, 비밀번호 찾기*/}
            <div className={styles.linksWrapper}>
                <div className={styles.links}>

                    <Link to="/signup" className={styles.linkFont}>
                        <div className={styles.linkLabels}>
                            <div>회원가입</div>
                        </div>
                    </Link>

                    <div className={styles.linkLabels1}>
                        <div> · </div>
                    </div>

                    <Link to="/user/password" className={styles.linkFont}>
                        <div className={styles.linkLabels}>
                            <div>비밀번호 찾기</div>
                        </div>
                    </Link>

                </div>
            </div>

        </div>


    );
};

export default Login;
