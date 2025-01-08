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
                <form action="/signup" id={styles.signupForm} method="POST">
                    <div className={styles.heading}>회원가입</div>

                    <label htmlFor="email">이메일</label>
                    <input type="email" id="email" name="email" required placeholder="이메일을 입력하세요"/>

                    <label htmlFor="password">비밀번호</label>
                    <input type="password" id="password" name="password" required placeholder="비밀번호를 입력하세요"/>

                    <label htmlFor="username">사용자 이름</label>
                    <input type="text" id="username" name="username" required placeholder="사용자 이름을 입력하세요"/>

                    <label htmlFor="phoneNumber">전화번호</label>
                    <input type="tel" id="phoneNumber" name="phoneNumber" required placeholder="전화번호를 입력하세요"/>

                    <label htmlFor="birthday">생일</label>
                    <input type="date" id="birthday" name="birthday" required/>

                    <label htmlFor="address">주소</label>
                    <input type="text" id="address" name="address" required placeholder="주소를 입력하세요"/>

                    <input type="submit" value="회원가입"/>

                    <div className={styles.right}>
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