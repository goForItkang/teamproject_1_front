import {useEffect, useState} from "react";
// import {Search} from "../components/Header";
import styles from "../css/profile.module.css";
import {ProfileStatus} from "../component/LinkFields";
import {InputPassword, InputReviseField} from "../component/InputFields";
import {ProfileTable} from "../component/Table";
import {SubmitButton} from "../component/SubmitButton";
import {validatePassword} from "../api/AuthApi";
import {getUser, patchPassword, patchUsername} from "../api/UserApi";


const Profile = () => {
    return(
        <ProfileForm/>
    )
}

const ProfileForm = () => {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")

    const submitUsernameHandle = async () => {
        const response = await patchUsername(username)

        if(response.ok){
            alert('닉네임이 변경되었습니다')
        }
        else{
            alert('닉네임 변경에 실패했습니다')
        }

    }

    useEffect(() => {
        const fetchUserData = async () => {
            const user = await getUser(); // 비동기 호출
            if (user) {
                setEmail(user.email)
                setUsername(user.username)
            }
        };

        fetchUserData();
    }, []);


    const profileData = [
        {
            label: "닉네임",
            value: <InputReviseField
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    submitHandle={submitUsernameHandle}
            />,
        },
        {
            label: "아이디(이메일)",
            value: <input
                value={email}
                className={styles.inputEmail}
                disabled
            />,
        },
        {
            label: "비밀번호 변경",
            value: <ChangePasswordForm />,
        },
    ];


    return (
        <div className={styles.div}>
            {/*<Search/>*/}

            <main className={styles.orderManagement}>

                <div className={styles.orderContainerParent}>
                    <ProfileStatus/>

                    <ProfileTable
                        profileData={profileData}
                    />
                </div>
            </main>
        </div>
    );
};


const ChangePasswordForm = () => {


    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState("")

    const [isFailCurrentPassword, setIsFailCurrentPassword] = useState(false)
    const [isFailConfirmNewPassword, setIsFailConfirmNewPassword] = useState(false)


    useEffect(() => {
        setIsFailCurrentPassword(false);
    }, [currentPassword]);

    useEffect(() => {
        checkedCurrentPassword();
    }, [newPassword, confirmNewPassword]);

    const checkedCurrentPassword = () => {


        if(newPassword.length <= confirmNewPassword.length
            && newPassword !== ""
            && confirmNewPassword !== ""
            && newPassword !== confirmNewPassword) {
            setIsFailConfirmNewPassword(true)
        }
        else{
            setIsFailConfirmNewPassword(false)
        }
    }


    const isSubmitPossible=()=>{
        if(newPassword !== confirmNewPassword){
            return false
        }

        return (
            currentPassword !== "" &&
            newPassword !== "" &&
            confirmNewPassword !== ""
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();



        try {
            if(currentPassword === newPassword){
                alert('비밀번호를 변경해주세요')
                return;
            }

            // 1. 비밀번호 확인 요청
            const response = await validatePassword(currentPassword);
            if (!response.ok) {
                setIsFailCurrentPassword(true);
                return;
            }

            // 2. 비밀번호 변경 요청
            setIsFailCurrentPassword(false)
            await patchPassword(newPassword);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
            alert('비밀번호가 변경되었습니다')
        } catch (err) {
            alert('서버와의 연결에 실패했습니다')
        }
    };

    //
    return (
        <>
            <div className={styles.formPadding}>
                <form onSubmit={handleSubmit} className={styles.form}
                      onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}>
                    <div className={styles.formStructure}>

                        <label htmlFor="currentPassword">기존 비밀번호</label>
                        <InputPassword
                            id="currentPassword"
                            isFail={isFailCurrentPassword}
                            placeholder="기존 비밀번호"
                            onChange={setCurrentPassword}
                            value={currentPassword}
                        />

                        <div className={styles.blankMini}/>

                        <label htmlFor="newPassword">새 비밀번호</label>
                        <InputPassword
                            id="newPassword"
                            isFail={false}
                            placeholder="새 비밀번호"
                            onChange={setNewPassword}
                            value={newPassword}
                        />

                        <InputPassword
                            id="confirmNewPassword"
                            isFail={isFailConfirmNewPassword}
                            placeholder="새 비밀번호 확인"
                            onChange={setConfirmNewPassword}
                            value={confirmNewPassword}
                        />


                    </div>
                    <SubmitButton
                        buttonName="비밀번호 변경"
                        isSubmitPossible={isSubmitPossible}
                    />
                </form>
            </div>
        </>
    )
}




export default Profile;
