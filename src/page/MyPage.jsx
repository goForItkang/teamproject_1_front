import React, { useState, useEffect } from 'react';
import {getUser, patchUser, patchPassword} from '../api/UserApi';
import {validatePassword} from '../api/AuthApi';
import styles from "../css/mypage.module.css";

const MyPage = () => {
    return (
        <div className={styles.pageContainer}>

            <MenuBar/>

            <div className={styles.formWrapper}>
                <Profile/> {/* 회원 정보 수정 폼 */}
            </div>

            <div className={styles.formWrapper}>
                <PasswordForm/> {/* 비밀번호 수정 폼 */}
            </div>

        </div>
    );
};

const MenuBar = () => {
    return(
        <>
            <div className={styles.menuBar}>
                <div className={styles.menuItem}>회원 정보 수정</div>
                <div className={styles.menuItem}>장바구니</div>
                <div className={styles.menuItem}>구매 목록</div>

            </div>
        </>
    )
}


const Profile = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: '',
        phoneNumber: '',
        birthday: ''
    });

    useEffect(() => {
        const fetchUserData = async () => {
            const user = await getUser(); // 비동기 호출
            if (user) {
                setFormData({
                    email: user.email || '',
                    password: '', // 비밀번호는 공란 유지
                    username: user.username || '',
                    phoneNumber: user.phoneNumber || '',
                    birthday: user.birthday || ''
                });
            }
        };

        fetchUserData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // 폼 제출 처리 함수
    const handleSubmit = async (e) => {
        e.preventDefault(); // 기본 폼 제출 방지

        try {
            // patchUser 함수 호출하여 API 요청 보내기
            const response = await patchUser(formData);

            if (response) {
                alert('수정 성공');
            }
        } catch (err) {
            console.error(err);
            alert('수정 실패: ' + err.message);
        }
    };

    return (
        <>
            <main>
                <form onSubmit={handleSubmit} className={styles.signupForm}>

                    <div className={styles.heading}>회원 정보</div>

                    <label htmlFor="email" className={styles.label}>이메일</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className={styles.input}
                        required
                        placeholder="이메일을 입력하세요"
                        value={formData.email}
                        onChange={handleInputChange}
                        readOnly
                    />

                    <label htmlFor="password" className={styles.label}>비밀번호</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className={styles.input}
                        required
                        placeholder="비밀번호를 입력하세요"
                        readOnly
                    />

                    <label htmlFor="username" className={styles.label}>사용자 이름</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className={styles.input}
                        required
                        placeholder="사용자 이름을 입력하세요"
                        value={formData.username}
                        onChange={handleInputChange}
                    />

                    <label htmlFor="phoneNumber" className={styles.label}>전화번호</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        className={styles.input}
                        required
                        placeholder="전화번호를 입력하세요"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                    />

                    <label htmlFor="birthday" className={styles.label}>생일</label>
                    <input
                        type="date"
                        id="birthday"
                        name="birthday"
                        className={styles.input}
                        required
                        value={formData.birthday}
                        onChange={handleInputChange}
                    />

                    <input type="submit" value="수정" className={styles.submitButton}/>

                </form>
            </main>
        </>
    );
}

const PasswordForm = () =>{
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');


    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();

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
            await patchPassword(newPassword);
            setSuccessMessage('비밀번호가 성공적으로 변경되었습니다.');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err) {
            setError(err.message || '서버와의 연결에 실패했습니다.');
        }
    };

    return (
        <>
            <main>
                <form onSubmit={handleSubmit} className={styles.signupForm}>

                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}

                    <div className={styles.heading}>비밀번호 수정</div>

                    <label htmlFor="currentPassword" className={styles.label}>현재 비밀번호</label>
                    <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        className={styles.input}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                        placeholder="현재 비밀번호를 입력하세요"
                    />

                    <label htmlFor="newPassword" className={styles.label}>변경 비밀번호</label>
                    <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        className={styles.input}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        placeholder="변경할 비밀번호를 입력하세요"
                    />

                    <label htmlFor="confirmPassword" className={styles.label}>비밀번호 확인</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        className={styles.input}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        placeholder="변경할 비밀번호를 다시 한 번 입력하세요"
                    />


                    <input type="submit" value="비밀번호 수정" className={styles.submitButton}/>
            </form>
        </main>
</>
)
    ;
}

export default MyPage;