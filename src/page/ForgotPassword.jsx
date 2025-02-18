
import {InputEmailTokenWithButton, InputEmailWithButton,
    InputPassword,
} from "../component/InputFields";
import styles from "../css/forgotPassword.module.css";
import React, {useEffect, useState} from "react";
import {ForgotPasswordLogo} from "../component/Logo";
import {SubmitButton} from "../component/SubmitButton";
import {useNavigate} from "react-router-dom";
import {getUserByEmail, patchForgotPassword} from "../api/UserApi";
import {authEmail, sendEmail} from "../api/EmailTokenApi";


const Signup = () => {
    return (
        <>
            <SignupForm/>
        </>
    )
}


const SignupForm = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [authCode, setAuthCode] = useState('');
    const [password, setPassword] = useState("")
    const [currentPassword, setCurrentPassword] = useState("")

    const [isEmailVerified, setIsEmailVerified] = useState(false); // 이메일 인증 상태
    const [isSubmitEmail, setIsSubmitEmail] = useState(false)
    const [isFailEmail, setIsFailEmail] = useState(false)
    const [isCheckedAuth, setIsCheckedAuth] = useState(false)
    const [isFailAuth, setIsFailAuth] = useState(false)
    const [isFailCurrentPassword, setIsFailCurrentPassword] = useState(false)




    useEffect(() => {
        checkedCurrentPassword();
    }, [currentPassword, password]);

    const checkedCurrentPassword = () => {
        if(currentPassword !== "" && password !== currentPassword){
            setIsFailCurrentPassword(true)
        }
        else{
            setIsFailCurrentPassword(false)
        }
    }

    // 이메일 인증 보내기
    const handleSendEmail = async () => {

        //회원 검사
        try{
            const response = await getUserByEmail(email);
            if(response == null){
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
            alert(error.message);
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
            currentPassword !== ""
        );
    }

    // 폼 제출 처리 함수
    const handleSubmit = async (e) => {
        e.preventDefault(); // 기본 폼 제출 방지


        try {
            // 비밀번호 변경 요청
            await patchForgotPassword(email, password);
            alert('비밀번호가 변경되었습니다')
            navigate('/')

        } catch (err) {
            console.error(err);
            alert('오류가 발생했습니다. 나중에 다시 시도해주세요.');
        }
    };



    return (

        <>

            <div className={styles.div}>
                <ForgotPasswordLogo/>
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
                            id="password"
                            isFail={false}
                            placeholder="새 비밀번호"
                            onChange={setPassword}
                        />
                        <InputPassword
                            id="currentPassword"
                            isFail={isFailCurrentPassword}
                            placeholder="새 비밀번호 확인"
                            onChange={setCurrentPassword}
                        />

                    </div>
                    <SubmitButton
                        buttonName="비밀번호 변경"
                        isSubmitPossible={isSubmitPossible}
                    />
                </form>


            </div>
        </>

    )
};

export default Signup;