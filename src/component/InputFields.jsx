import styles from "../css/inputFields.module.css";
import React, {useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const InputField = ({imageStyle,imageSrc, ...props}) =>{
    // const [focus, setFocus] = useState(false)
    //
    // const handleFocus = (e) =>{
    //     setFocus(!focus)
    //     props.onFocus(e)
    // }


    return (
        <>
            <div className={styles.inputFields}>
                <div className={styles.inputFieldsChild}/>
                {/*<div className={styles.iconFields}>*/}
                <img className={styles[imageStyle]} alt="" src={`/images${imageSrc}`}/>
                {/*</div>*/}
                <input
                    className={styles.input}
                    {...props}
                    // onFocus={(e) => handleFocus(e)}
                />
            </div>
        </>
    )
}

export const InputFieldWithButton = ({inputStyle,imageStyle,imageSrc, buttonName, onClick, isFail,...props}) =>{

    const [value, setValue] = useState("")
    const [focus, setFocus] = useState(false)

    const getButtonDesign = () =>{
        if(value !== "") return "emailAbleButton";
        return "emailUnableButton";
    }

    const getInputStyle = () => {
        if (isFail === true) return "topInputFieldsFailedStructure"
        else if (focus === true) return "topInputFieldsFilledStructure"
        else return "topInputFieldsStructure"
    }

    const handleChange = (e) =>{
        setValue(e.target.value)
        props.onChange(e)
    }

    const handleFocus = (e) =>{
        setFocus(true)
        props.onFocus(e)
    }

    const handleBlur = (e) =>{
        setFocus(false)
        props.onBlur(e)
    }


    return (
        <>
            {/*<div className = {styles.topInputFieldsStructure}> </div>*/}
            {/*<div className={styles.inputFieldsStructure}>*/}
                <div className={styles[getInputStyle()]}>
                    <div className={styles.topInputFieldsStructureChild}/>
                    <div className={styles.iconInputFields}>
                        <img className={styles[imageStyle]} alt="" src={`/images${imageSrc}`}/>
                    </div>
                    <input
                        className={styles.input}
                        {...props}
                        onFocus={(e)=>handleFocus(e)}
                        onBlur={(e)=>handleBlur(e)}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <button
                    {...props}
                    id={`button${props.id}`}
                    type="button"
                    className={styles[getButtonDesign()]}
                    onClick = {onClick}>
                    <div className={styles.bottomInputFieldsStructureChild}/>
                    <div className={styles.div123}>{buttonName}</div>
                </button>
            {/*</div>*/}
        </>
    )
}

export const InputEmailWithButton = ({isSubmitEmail, isFail, ...props}) => {

    const [email, setEmail] = useState("")
    const [focusEmail, setFocusEmail] = useState(false);


    const getEmailImage = () => {
        if (isFail === true) return "/-icon-mail-fail.svg"
        else if (focusEmail === true || email !== "") return "/-icon-mail-fill.svg"
        else return "/-icon-mail-none.svg"
    }


    const handleChange = (e) =>{
        setEmail(e.target.value)
        props.onChange(e.target.value)
    }



    return (
        <>
            <div className={styles.inputFieldsStructure}>
                <InputFieldWithButton
                    {...props}
                    isFail={isFail}
                    imageStyle="iconMail"
                    imageSrc={getEmailImage()}
                    buttonName="인증"
                    placeholder="이메일"
                    type="text"
                    id="email"
                    name="email"
                    value={email}
                    onFocus={() => setFocusEmail(true)}
                    onBlur={() => setFocusEmail(false)}
                    onChange={(e) => {
                        handleChange(e)
                    }}

                />

            </div>

            {isSubmitEmail &&
                <div className={styles.submitEmailMessage}>
                    <ul className={styles.ul}>
                        <li>{`인증번호가 전송되었습니다. `}</li>
                    </ul>
                </div>
            }
            {isFail &&
                <div className={styles.div2}>
                    <ul className={styles.ul}>
                        <li>
                            사용할 수 없는 이메일입니다. 다른 이메일을 입력해 주세요.
                        </li>
                    </ul>
                </div>
            }
        </>
    )
}

export const InputEmailTokenWithButton = ({isCheckedAuth, isFail,...props}) => {

    const [email, setEmail] = useState("")
    const [focusEmail, setFocusEmail] = useState(false);


    const getEmailImage = () => {
        if (isFail === true) return "/-icon-mail-fail.svg"
        else if (focusEmail === true || email !== "") return "/-icon-mail-fill.svg"
        else return "/-icon-mail-none.svg"
    }

    const handleChange = (e) =>{
        setEmail(e.target.value)
        props.onChange(e.target.value)
    }


    return (
        <>
            <div className={styles.inputFieldsStructure}>
                <InputFieldWithButton
                    {...props}
                    isFail={isFail}
                    imageStyle="iconMail"
                    imageSrc={getEmailImage()}
                    buttonName="확인"
                    placeholder="이메일 인증번호"
                    type="text"
                    id="emailToken"
                    name="emailToken"
                    value={email}
                    onFocus={() => setFocusEmail(true)}
                    onBlur={() => setFocusEmail(false)}
                    onChange={(e) => {
                        handleChange(e)
                    }}
                />

            </div>

            {isFail &&
                <div className={styles.div2}>
                    <ul className={styles.ul}>
                        <li>
                            이메일 인증번호가 잘못 입력되었습니다. 번호를 확인한 후 다시 입력해 주세요.
                        </li>
                    </ul>
                </div>
            }

            {isCheckedAuth &&
                <div className={styles.submitEmailMessage}>
                    <ul className={styles.ul}>
                        <li>{`이메일 인증이 확인되었습니다.`}</li>
                    </ul>
                </div>
            }
        </>
    )
}

export const InputPassword = ({isFail, placeholder, ...props}) => {

    const [password, setPassword] = useState("")
    const [focusPassword, setFocusPassword] = useState(false)
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)


    const getPasswordImage = () => {
        if (isFail === true) return "/-icon-lock-fail.svg"
        else if (focusPassword === true || password !== "") return "/-icon-lock-fill.svg"
        return "/-icon-lock-none.svg"
    }

    const getPasswordVisibleImage = () => {
        if (isPasswordVisible) return "/-icon-password-visible.svg"
        else return "/-icon-password-hidden.svg"
    }

    const toggleIsPasswordVisible = () =>{
        setIsPasswordVisible(!isPasswordVisible)
    }

    const handleChange = (e) =>{
        setPassword(e.target.value)
        props.onChange(e.target.value)
    }

    return (
        <>

            {/*비밀번호 입력*/}
            <div className={isFail === true ? styles.passwordFailureFields : styles.inputFields}>
                <div className={styles.inputFieldsChild}/>
                <div className={styles.iconLockParent}>
                    <img className={styles.iconLock} alt="" src={`/images${getPasswordImage()}`}/>
                    <input
                        {...props}
                        className={styles.input}
                        type={isPasswordVisible ? "text" : "password"}
                        // id="password"
                        name="password"
                        placeholder={placeholder}
                        value={password}
                        onFocus={() => setFocusPassword(true)}
                        onBlur={() => setFocusPassword(false)}
                        onChange={(e) => handleChange(e)}
                    />
                </div>

                {/*비밀번호 보기1*/}
                <div className={styles.groupWrapper}>
                    <img className={styles.groupIcon}
                         alt=""
                         src={`/images${getPasswordVisibleImage()}`}
                         onClick={toggleIsPasswordVisible}
                    />
                </div>
            </div>


            {isFail === true &&
                <div className={styles.div2}>
                    <ul className={styles.ul}>
                        <li>
                            비밀번호가 일치하지 않았습니다. 비밀번호를 확인한 후 다시 입력해 주세요.
                        </li>
                    </ul>
                </div>
            }

        </>
    )
}


export const InputName = ({...props}) => {
    const [name, setName] = useState("")
    const [focusName, setFocusName] = useState(false)

    const getNameImage = () => {
        if (focusName === true || name !== "") return "/-icon-person-fill.svg"
        else return "/-icon-person-none.svg"
    }

    const handleChange = (e) =>{
        setName(e.target.value)
        props.onChange(e.target.value)
    }

    return (
        <>
            {/*<div className={styles.inputFieldsStructureName}>*/}
                <InputField
                    imageStyle="iconPerson"
                    imageSrc={getNameImage()}
                    type="text"
                    id="username"
                    name="username"
                    placeholder="닉네임"
                    onFocus={() => setFocusName(true)}
                    onBlur={() => setFocusName(false)}
                    onChange={(e) => handleChange(e)}
                />
            {/*</div>*/}

        </>
    )
}


export const InputBirthday = ({...props}) =>{
    const [birthday, setBirthday] = useState(null)
    const [focusBirthday, setFocusBirthday] = useState(false)

    const getBirthdayImage = () =>{
        if(focusBirthday === true || birthday !== null) return "/-icon-birthday-fill.png"
        else return "/-icon-birthday-none.svg"
    }

    const handleChange = (date) =>{
        setBirthday(date)
        props.onChange(date)
    }


    return (
        <>
            <div className={styles.inputFieldsStructureBirthday}>
                <div className={styles.inputFieldsChild}/>
                <div className={styles.iconFields}>
                    <img className={styles.iconBirthday} alt="" src={`/images${getBirthdayImage()}`}/>
                </div>
                {/*input - type(date)는 브라우저에서 지원하는 기본 폰트로 고정돼서 DatePicker로 제작*/}
                <DatePicker
                    className={styles.input}
                    wrapperClassName={styles['date-picker-wrapper']}
                    selected={birthday}
                    onChange={date => handleChange(date)}
                    placeholderText="연도-월-일"
                    dateFormat="yyyy-MM-dd"
                    popperPlacement="bottom-start"
                    onFocus={() => setFocusBirthday(true)}
                    onBlur={() => setFocusBirthday(false)}
                />
            </div>


        </>
    )
}

export const InputPhoneNumber = ({...props}) =>{
    const [phoneNumber, setPhoneNumber] = useState("")
    const [focusPhoneNumber, setFocusPhoneNumber] = useState(false)

    const getPhoneImage = () =>{
        if(focusPhoneNumber === true || phoneNumber !== "") return "/-icon-phone-fill.svg"
        else return "/-icon-phone-none.svg"
    }

    const handleChange = (e) =>{
        setPhoneNumber(e.target.value)
        props.onChange(e.target.value)
    }

    return (
        <>
            {/*<div className={styles.inputFieldsStructurePhone}>*/}
                <InputField
                    imageStyle="iconPerson"
                    imageSrc={getPhoneImage()}
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="전화번호"
                    onFocus={() => setFocusPhoneNumber(true)}
                    onBlur={() => setFocusPhoneNumber(false)}
                    onChange={(e) => handleChange(e)}
                />
            {/*</div>*/}
        </>
    )
}

