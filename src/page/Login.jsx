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
            <form action="/login" className={styles['login-form']} method="POST">
                <div className={styles.heading}>로그인</div>

                <label htmlFor="email" className={styles.label}>이메일</label>
                <input type="email" id="email" name="email" className={styles.input} required placeholder="이메일을 입력하세요"/>

                <label htmlFor="password" className={styles.label}>비밀번호</label>
                <input type="password" id="password" name="password" className={styles.input} required
                       placeholder="비밀번호를 입력하세요"/>

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