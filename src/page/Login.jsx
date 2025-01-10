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

    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
    const LOGIN_ENDPOINT = '/login';

    const handleLogin = async (e) => {
        try {
            const formData = new FormData();
            formData.append('email', user.email);
            formData.append('password', user.password);

            const response = await axios({
                url: `${BASE_URL}${LOGIN_ENDPOINT}`,
                method: 'POST',
                data: formData,
                withCredentials: true,
            });


            if (response.status === 200) {
                alert('로그인 성공! (가끔씩 응답이 안오는 경우 있음. 캐시로 인한 것으로 추측 status=304)');
                // 로그인 성공 후 처리할 작업 (예: JWT 토큰 저장, 페이지 이동 등)
                // 예시: 로컬 스토리지에 JWT 저장
                localStorage.setItem('token', response.data.token);
            } else {
                alert('로그인 실패');
            }
        } catch (error) {
            console.log('로그인 에러: ', error);
        }
    };

    return (
        <>
            <form onSubmit={handleLogin} className={styles['login-form']}>
                <div className={styles.heading}>로그인</div>

                <label htmlFor="email" className={styles.label}>이메일</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    className={styles.input}
                    required
                    placeholder="이메일을 입력하세요"
                />

                <label htmlFor="password" className={styles.label}>비밀번호</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
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