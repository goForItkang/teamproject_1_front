import React from 'react';
import { useState } from 'react';
import styles from '../css/login.module.css'
import axios from 'axios';


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

    // 폼 제출 처리 함수
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
                    <a href="#" className={`${styles['social-button']} ${styles.facebook}`}>Facebook</a>
                    <a href="#" className={`${styles['social-button']} ${styles.twitter}`}>Twitter</a>
                    <a href="#" className={`${styles['social-button']} ${styles.googlePlus}`}>Google+</a>

                    <div className={styles.links}>
                        <a href="#">회원가입</a> |
                        <a href="#">비밀번호 찾기</a>
                    </div>
                </div>
            </form>
        </>
    );
};

export default Login;