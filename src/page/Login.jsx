import React from 'react';
import { useState } from 'react';
import styles from '../css/login.module.css'


const Login = () => {
    return (
        <div>
            <Template/>
        </div>
    );
};

const Template = () => {

    return (
        <>
            <form action="/login" id={styles['login-form']} method="POST">
                <div className={styles.heading}>로그인</div>

                <label htmlFor="email">이메일</label>
                <input type="email" id="email" name="email" required placeholder="이메일을 입력하세요"/>

                <label htmlFor="password">비밀번호</label>
                <input type="password" id="password" name="password" required placeholder="비밀번호를 입력하세요"/>

                <input type="submit" value="로그인"/>

                <div className={styles.right}>
                    <div className={styles.connect}>소셜 로그인</div>
                    <a href="#" className={styles.facebook}>Facebook</a>
                    <a href="#" className={styles.twitter}>Twitter</a>
                    <a href="#" className={styles.googlePlus}>Google+</a>

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