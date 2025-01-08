import React from 'react';
import styles from '../css/signup.module.css'


const Signup = () => {
    return (
        <div>
            <Asd />
        </div>
    );
};

const Asd = () => {

    return (
        <>
            <main>
                <form action="/login" className={styles.signupForm} method="POST">

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

                    <label htmlFor="address" className={styles.label}>주소</label>
                    <input type="text" id="address" name="address" className={styles.input} required placeholder="주소를 입력하세요"/>

                    <input type="submit" value="회원가입" className={styles.submitButton}/>


                    <div className={styles.right}>
                        <div className={styles.connect}>소셜 로그인</div>
                        <a href="#" className={`${styles.socialButton} ${styles.facebook}`}>Facebook</a>
                        <a href="#" className={`${styles.socialButton} ${styles.twitter}`}>Twitter</a>
                        <a href="#" className={`${styles.socialButton} ${styles.googlePlus}`}>Google+</a>

                        <div className={styles.links}>
                            <a href="#">로그인</a> |
                            <a href="#">비밀번호 찾기</a>
                        </div>
                    </div>
                </form>
            </main>
        </>
    );
};

export default Signup;