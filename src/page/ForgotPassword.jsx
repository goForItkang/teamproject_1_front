
import React, { useState } from 'react';
import styles from '../css/forgotPassword.module.css'

import {getUserByEmail, patchForgotPassword} from "../api/UserApi";
import {authEmail, sendEmail} from "../api/EmailTokenApi";
import {validatePassword} from "../api/AuthApi";
import {Link} from "react-router-dom";





const ForgotPassword = () => {
    return (
        <div>
            <PasswordForm/>
        </div>
    );
};

const PasswordForm = () => {

    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [email, setEmail] = useState('');
    const [authCode, setAuthCode] = useState('');
    const [isEmailVerified, setIsEmailVerified] = useState(false); // 이메일 인증 상태
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    // 이메일 인증 보내기
    const handleSendEmail = async () => {

        //중복 회원 검사
        try{
            const response = await getUserByEmail(email);
            if(response == null){
                alert("회원 계정이 없는 이메일입니다.")
                return
            }
        }catch(error){
            alert(error.message);
            return
        }
        try {
            alert('이메일 인증 링크가 전송되었습니다.');
            const response = await sendEmail({ email });
        } catch (error) {
            alert(error.message);
        }
    };

    // 이메일 인증 처리
    const handleAuthEmail = async () => {

        try {
            const response = await authEmail({ email, authCode });
            if (response) {
                setIsEmailVerified(true);
                alert('이메일 인증이 완료되었습니다.');
            }
        } catch (error) {
            alert(error.message);
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault(); // 기본 폼 제출 방지

        if (!isEmailVerified) {
            alert('이메일 인증이 필요합니다.');
            return;
        }

        if (newPassword !== confirmPassword) {
            console.log('newPassword : ' + newPassword)
            console.log('confirmPassword : ' + confirmPassword)
            setError('새 비밀번호와 비밀번호 확인이 일치하지 않습니다.');
            return;
        }

        try {
            // 1. 비밀번호 확인 요청
            const isValidPassword = await validatePassword(currentPassword);
            if (!isValidPassword) {
                setError('현재 비밀번호가 잘못되었습니다.');
                return;
            }

            // 2. 비밀번호 변경 요청
            await patchForgotPassword(email, newPassword);
            setSuccessMessage('비밀번호가 성공적으로 변경되었습니다.');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');

            alert("비밀번호가 변경되었습니다.")
        } catch (err) {
            setError(err.message || '서버와의 연결에 실패했습니다.');
        }
    };



    return (
        <main>

            <form onSubmit={handleSubmit} className={styles.signupForm}>
                <div className={styles.heading}>비밀번호 수정</div>

                <label htmlFor="email" className={styles.label}>이메일</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className={styles.input}
                    required
                    placeholder="이메일을 입력하세요"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isEmailVerified}
                />
                <button
                    type="button"
                    onClick={handleSendEmail}
                    disabled={isEmailVerified}
                    className={styles.submitButton}
                >
                    이메일 인증 보내기
                </button>

                {isEmailVerified && (
                    <div>이메일 인증 완료되었습니다.</div>
                )}

                <label htmlFor="emailToken" className={styles.label}>인증 코드</label>
                <input
                    type="text"
                    id="emailToken"
                    name="emailToken"
                    className={styles.input}
                    required
                    placeholder="이메일 인증 코드를 입력하세요"
                    value={authCode}
                    disabled={isEmailVerified}
                    onChange={(e) => setAuthCode(e.target.value)}
                />
                <button type="button"
                        onClick={handleAuthEmail}
                        disabled={isEmailVerified}
                        className={styles.submitButton}
                >
                    인증 코드 확인
                </button>

                <label htmlFor="currentPassword" className={styles.label}>비밀번호</label>
                <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    className={styles.input}
                    required
                    placeholder="비밀번호를 입력하세요"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />

                <label htmlFor="newPassword" className={styles.label}>새 비밀번호</label>
                <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    className={styles.input}
                    required
                    placeholder="새 비밀번호를 입력하세요"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />

                <label htmlFor="confirmPassword" className={styles.label}>비밀번호 확인</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className={styles.input}
                    required
                    placeholder="변경할 비밀번호를 다시 한 번 입력하세요"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />


                {error && <div style={{color: 'red'}}>{error}</div>}
                {successMessage && <div style={{color: 'green'}}>{successMessage}</div>}

                <input type="submit" value="회원가입" className={styles.submitButton}/>

                <div className={styles.links}>
                    <Link to="/login">로그인</Link> |
                    <Link to="/signup">회원가입</Link>
                </div>
            </form>

        </main>
    );
};

export default ForgotPassword;