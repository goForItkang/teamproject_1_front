
import {
    InputEmailTokenWithButton, InputEmailWithButton,
    InputName,
    InputPassword,
} from "../component/InputFields";
import styles from "../css/signup.module.css";
import React, {useEffect, useState} from "react";
import {LoginLogo} from "../component/Logo";
import {SubmitButton} from "../component/SubmitButton";
import {useNavigate, useSearchParams} from "react-router-dom";
import {getUserByEmail} from "../api/UserApi";
import {authEmail, sendEmail} from "../api/EmailTokenApi";
import {LinkLoginAndFindPassword} from "../component/LinkFields";

const Signup = () => {
    return (
        <>
            <SignupForm/>
        </>
    )
}


const SignupForm = () => {
    const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
    const LOGIN_ENDPOINT = '/api/signup';
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const [email, setEmail] = useState('');
    const [authCode, setAuthCode] = useState('');
    const [password, setPassword] = useState("")
    const [currentPassword, setCurrentPassword] = useState("")
    const [username, setUsername] = useState("")
    // const [birthday, setBirthday] = useState("")
    // const [phoneNumber, setPhoneNumber] = useState("")
    const [isEmailVerified, setIsEmailVerified] = useState(false); // 이메일 인증 상태
    const [isSubmitEmail, setIsSubmitEmail] = useState(false)
    const [isFailEmail, setIsFailEmail] = useState(false)
    const [isCheckedAuth, setIsCheckedAuth] = useState(false)
    const [isFailAuth, setIsFailAuth] = useState(false)
    const [isFailCurrentPassword, setIsFailCurrentPassword] = useState(false)

    useEffect(() => {
        const emailParam = searchParams.get('email');  // 'email' 쿼리 파라미터 값을 가져옴
        if (emailParam) {
            setEmail(emailParam);  // email 값을 상태에 설정
        }
    }, [searchParams]);  // searchParams가 변경될 때마다 실행


    useEffect(() => {
        checkedCurrentPassword();
    }, [currentPassword, password]);

    const checkedCurrentPassword = () => {
        // console.log("currentPassword : " + currentPassword)
        if(currentPassword !== "" && password !== currentPassword){
            setIsFailCurrentPassword(true)
        }
        else{
            setIsFailCurrentPassword(false)
        }
    }

    // 이메일 인증 보내기
    const handleSendEmail = async () => {

        //중복 회원 검사1
        try{
            const response = await getUserByEmail(email);
            if(response != null){
                setIsSubmitEmail(false)
                setIsFailEmail(true)
                // alert("이미 사용 중인 이메일입니다.")
                return
            }
        }catch(error){
            alert(error.message);
            return
        }


        try {
            setIsFailEmail(false)
            setIsSubmitEmail(true)
            // alert('이메일 인증 링크가 전송되었습니다.');
            const response = await sendEmail({ email });
        } catch (error) {
            // alert(error.message);
        }
    };

    // 이메일 인증 처리
    const handleAuthEmail = async () => {
        setIsSubmitEmail(false)
        try {
            const response = await authEmail({ email, authCode });
            if (response) {
                setIsCheckedAuth(true)
                setIsEmailVerified(true);
                setIsFailAuth(false)
                // alert('이메일 인증이 완료되었습니다.');
            }
            else{
                setIsFailAuth(true)
            }
        } catch (error) {
            setIsFailAuth(true)
            // alert(error.message);
        }
    };



    const isSubmitPossible=()=>{
        if(isEmailVerified !== true || password !== currentPassword){
            return false
        }


        return (
            email !== "" &&
            authCode !== "" &&
            password !== "" &&
            currentPassword !== "" &&
            username !== ""
        );
    }

    // 폼 제출 처리 함수
    const handleSubmit = async (e) => {
        e.preventDefault(); // 기본 폼 제출 방지


        // 폼 데이터 수집
        const formData = {
            email,
            password,
            username,
            // phoneNumber,
            // birthday
        };

        try {

            // 회원가입 요청
            const response = await fetch(`${BASE_URL}${LOGIN_ENDPOINT}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('회원가입에 성공했습니다');
                navigate('/')
            } else {
                // alert('회원가입 실패');
            }
        } catch (err) {
            console.error(err);
            // alert('오류가 발생했습니다. 나중에 다시 시도해주세요.');
        }
    };



    return (

        <>

            {/*로그인 - 이메일, 비밀번호1*/}

            <div className={styles.div}>
                <LoginLogo/>
                <form onSubmit={handleSubmit} className={styles.form}  onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}>
                    <div className={styles.formStructure}>
                        <InputEmailWithButton
                            onChange={setEmail}
                            onClick = {handleSendEmail}
                            disabled={isEmailVerified}
                            isSubmitEmail = {isSubmitEmail}
                            isFail = {isFailEmail}
                        />
                        <InputEmailTokenWithButton
                            onChange={setAuthCode}
                            onClick = {handleAuthEmail}
                            disabled={isEmailVerified}
                            isCheckedAuth = {isCheckedAuth}
                            isFail = {isFailAuth}
                        />
                        <InputPassword
                            isFail={false}
                            placeholder="비밀번호"
                            onChange={setPassword}
                        />
                        <InputPassword
                            isFail={isFailCurrentPassword}
                            placeholder="비밀번호 확인"
                            onChange={setCurrentPassword}
                        />
                        <InputName
                            onChange={setUsername}
                        />
                        {/*<InputBirthday*/}
                        {/*    onChange={setBirthday}*/}
                        {/*/>*/}
                        {/*<InputPhoneNumber*/}
                        {/*    onChange={setPhoneNumber}*/}
                        {/*/>*/}
                    </div>
                    <SubmitButton
                        buttonName="회원가입"
                        isSubmitPossible={isSubmitPossible}
                    />
                </form>

                {/*div : form과 Link사이에 간격 늘리는 용도*/}
                <div></div>
                <LinkLoginAndFindPassword/>
            </div>

        </>

    )
};

export default Signup;