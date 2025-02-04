import React, {useEffect, useState} from 'react';
import { sendEmail, authEmail } from '../api/EmailTokenApi'; // 이미 제공된 API 함수
import styles from '../css/signup.module.css';
import {Link, useSearchParams} from "react-router-dom";
import {getUserByEmail} from "../api/UserApi";

const Signup = () => {
    return (
        <>
            <SignupForm/>
        </>
    );
};



const SignupForm = () => {
    const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
    const LOGIN_ENDPOINT = '/api/signup';

    // 상태 관리
    const [searchParams] = useSearchParams();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthday, setBirthday] = useState('');
    const [authCode, setAuthCode] = useState('');
    const [isEmailVerified, setIsEmailVerified] = useState(false); // 이메일 인증 상태

    useEffect(() => {
        const emailParam = searchParams.get('email');  // 'email' 쿼리 파라미터 값을 가져옴
        if (emailParam) {
            setEmail(emailParam);  // email 값을 상태에 설정
        }
    }, [searchParams]);  // searchParams가 변경될 때마다 실행


    // 이메일 인증 보내기
    const handleSendEmail = async () => {

        //중복 회원 검사
        try{
            const response = await getUserByEmail(email);
            if(response != null){
                alert("이미 사용 중인 이메일입니다.")
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

    // 폼 제출 처리 함수
    const handleSubmit = async (e) => {
        e.preventDefault(); // 기본 폼 제출 방지

        if (!isEmailVerified) {
            alert('이메일 인증이 필요합니다.');
            return;
        }

        // 폼 데이터 수집
        const formData = {
            email,
            password,
            username,
            phoneNumber,
            birthday
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
                alert('회원가입 성공');
            } else {
                alert('회원가입 실패');
            }
        } catch (err) {
            console.error(err);
            alert('오류가 발생했습니다. 나중에 다시 시도해주세요.');
        }
    };

    return (
        <main>
            <form onSubmit={handleSubmit} className={styles.signupForm}>
                <div className={styles.heading}>회원가입</div>

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

                <label htmlFor="password" className={styles.label}>비밀번호</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className={styles.input}
                    required
                    placeholder="비밀번호를 입력하세요"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <label htmlFor="username" className={styles.label}>사용자 이름</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    className={styles.input}
                    required
                    placeholder="사용자 이름을 입력하세요"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <label htmlFor="phoneNumber" className={styles.label}>전화번호</label>
                <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    className={styles.input}
                    required
                    placeholder="전화번호를 입력하세요"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />

                <label htmlFor="birthday" className={styles.label}>생일</label>
                <input
                    type="date"
                    id="birthday"
                    name="birthday"
                    className={styles.input}
                    required
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                />

                <input type="submit" value="회원가입" className={styles.submitButton} />

                <div className={styles.right}>

                    <div className={styles.links}>
                        <Link to="/login">로그인</Link> |
                        <Link to="/user/password">비밀번호 찾기</Link>
                    </div>
                </div>
            </form>
        </main>
    );
};

export default Signup;
