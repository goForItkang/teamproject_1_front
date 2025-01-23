import React from 'react';
import styles from '../css/signup.module.css'
import {Link} from "react-router-dom";


const Signup = () => {
    return (
        <div>
            <SignupForm />
        </div>
    );
};

const SignupForm = () => {
    const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
    const LOGIN_ENDPOINT = '/api/signup';

    // 폼 제출 처리 함수.
    const handleSubmit = async (e) => {
        e.preventDefault(); // 기본 폼 제출 방지

        // 폼 데이터를 수집
        const formData = new FormData(e.target); // e.target은 폼 엘리먼트를 참조
        const json = Object.fromEntries(formData); // FormData를 객체로 변환

        try {
            // POST 요청 보내기
            const response = await fetch(`${BASE_URL}${LOGIN_ENDPOINT}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(json), // JSON 형식으로 변환된 데이터를 전송
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
        <>
            <main>
                <form onSubmit={handleSubmit} className={styles.signupForm}>

                    <div className={styles.heading}>회원가입</div>

                    <label htmlFor="email" className={styles.label}>이메일</label>
                    <input type="email" id="email" name="email" className={styles.input} required placeholder="이메일을 입력하세요"/>

                    <label htmlFor="password" className={styles.label}>비밀번호</label>
                    <input type="password" id="password" name="password" className={styles.input} required placeholder="비밀번호를 입력하세요"/>

                    <label htmlFor="username" className={styles.label}>사용자 이름</label>
                    <input type="text" id="username" name="username" className={styles.input} required placeholder="사용자 이름을 입력하세요"/>

                    <label htmlFor="phoneNumber" className={styles.label}>전화번호</label>
                    <input type="tel" id="phoneNumber" name="phoneNumber" className={styles.input} required placeholder="전화번호를 입력하세요"/>

                    <label htmlFor="birthday" className={styles.label}>생일</label>
                    <input type="date" id="birthday" name="birthday" className={styles.input} required/>

                    <input type="submit" value="회원가입" className={styles.submitButton}/>


                    <div className={styles.right}>
                        <div className={styles.connect}>소셜 로그인</div>
                        <Link to="#" className={`${styles.socialButton} ${styles.facebook}`}>Facebook</Link>
                        <Link to="#" className={`${styles.socialButton} ${styles.twitter}`}>Twitter</Link>
                        <Link to="#" className={`${styles.socialButton} ${styles.googlePlus}`}>Google+</Link>

                        <div className={styles.links}>
                            <Link to="#">로그인</Link> |
                            <Link to="#">비밀번호 찾기</Link>
                        </div>
                    </div>
                </form>
            </main>
        </>
    );
};

export default Signup;