import React from 'react';
import { useState } from 'react';
import styles from '../css/login.module.css'
import axios from 'axios';
import {Link} from "react-router-dom";
import {loginGoogle, loginNaver} from "../api/OAuth2Api";




const Login = () => {
    return (
        <div>
            <LoginForm/>
        </div>
    );
};

const LoginForm = () => {
    const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
    const LOGIN_ENDPOINT = '/api/auth/login';
    const LOGIN_OAUTH2_ENDPOINT = '/api/login/oauth2';
    const GOOGLE_URL = `${BASE_URL}${LOGIN_OAUTH2_ENDPOINT}/google`
    const NAVER_URL = `${BASE_URL}${LOGIN_OAUTH2_ENDPOINT}/naver`


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
                alert('로그인 성공.');
            } else {
                alert('로그인 실패');
            }
        } catch (err) {
            console.error(err);
            alert('오류가 발생했습니다. 나중에 다시 시도해주세요.');
        }
    };

    // const handleGoogle = async () => {
    //     try {
    //         // Google 로그인 처리
    //         const data = await loginGoogle();
    //
    //         // 로그인 성공 후 data를 처리 (필요한 경우)
    //         console.log(data);
    //
    //         // 이미 loginGoogle 내에서 리다이렉트가 처리되므로 추가 리다이렉트는 필요하지 않습니다.
    //     } catch (error) {
    //         // 오류 처리 (예: 사용자에게 오류 메시지 표시)
    //         console.error('로그인 중 오류가 발생했습니다:', error.message);
    //     }
    // };

    // const handleNaver = async () => {
    //     try {
    //         // Google 로그인 처리
    //         const data = await loginNaver();
    //
    //         // 로그인 성공 후 data를 처리 (필요한 경우)
    //         console.log(data);
    //
    //         // 이미 loginGoogle 내에서 리다이렉트가 처리되므로 추가 리다이렉트는 필요하지 않습니다.
    //     } catch (error) {
    //         // 오류 처리 (예: 사용자에게 오류 메시지 표시)
    //         console.error('로그인 중 오류가 발생했습니다:', error.message);
    //     }
    // };


    return (
        <>
            <form onSubmit={handleSubmit} className={styles['login-form']}>
                <div className={styles.heading}>로그인</div>

                <label htmlFor="email" className={styles.label}>이메일</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className={styles.input}
                    required
                    placeholder="이메일을 입력하세요"
                />

                <label htmlFor="password" className={styles.label}>비밀번호</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className={styles.input}
                    required
                    placeholder="비밀번호를 입력하세요"
                />

                <input type="submit" value="로그인" className={styles['submit-button']}/>

                <div className={styles.right}>
                    <div className={styles.connect}>소셜 로그인</div>
                    <Link to= {GOOGLE_URL}
                          className={`${styles['social-button']} ${styles.googlePlus}`}>Google</Link>
                    <Link to= {NAVER_URL}
                          className={`${styles['social-button']} ${styles.googlePlus}`}>Naver</Link>
                    <div className={styles.links}>
                        <Link to="/signup">회원가입</Link> |
                        <Link to="/user/password">비밀번호 찾기</Link>
                    </div>
                </div>
            </form>
        </>
    );
};

export default Login;