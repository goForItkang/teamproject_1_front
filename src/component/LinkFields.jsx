import styles from "../css/LinkFields.module.css";
import {Link, useLocation} from "react-router-dom";
import React, {useEffect, useState} from "react";

export const LinkFieldPair = ({Link1, Link1Name, Link2, Link2Name}) =>{


    return(
        <>
            {/*회원가입, 비밀번호 찾기*/}
            <div className={styles.linksWrapper}>
                <div className={styles.links}>

                    <Link to={Link1} className={styles.linkFont}>
                        <div className={styles.linkLabels}>
                            <div>{Link1Name}</div>
                        </div>
                    </Link>

                    <div className={styles.linkLabels1}>
                        <div> · </div>
                    </div>

                    <Link to={Link2} className={styles.linkFont}>
                        <div className={styles.linkLabels}>
                            <div>{Link2Name}</div>
                        </div>
                    </Link>

                </div>
            </div>
        </>
    )
}

export const LinkLoginAndFindPassword = () =>{

    return(
        <>
            <LinkFieldPair
                Link1="/login"
                Link1Name="로그인"
                Link2="/user/password"
                Link2Name="비밀번호 찾기"
            />
        </>
    )
}

export const ProfileStatus = () => {
    const orderURI = '/1';
    const addressURI = '/2';
    const profileURI = '/user/profile/edit'

    const [isOrder, setIsOrder] = useState(false);
    const [isAddress, setIsAddress] = useState(false);
    const [isProfile, setIsProfile] = useState(false);

    const location = useLocation();

    useEffect(() => {
        findCurrentLocation();
    }, [location.pathname]);

    const findCurrentLocation = () =>{
        setIsOrder(false);
        setIsAddress(false);
        setIsProfile(false);

        if(location.pathname === orderURI) setIsOrder(true)
        if(location.pathname === addressURI) setIsAddress(true)
        if(location.pathname === profileURI) setIsProfile(true)
    }

    return(
        <div className={styles.orderContainer}>
            <div className={styles.orderHeader}>

                <LinkStatusFocusAndNoFocus
                    to={orderURI}
                    name='주문 목록'
                    isFocus={isOrder}
                />
                <LinkStatusFocusAndNoFocus
                    to={addressURI}
                    name='배송지 관리'
                    isFocus={isAddress}
                />
                <LinkStatusFocusAndNoFocus
                    to={profileURI}
                    name='계정 관리'
                    isFocus={isProfile}
                />

            </div>
        </div>

    )
}

const LinkStatusFocusAndNoFocus = ({to,name, isFocus}) => {
    return (
        <>
            {
                isFocus ?
                    (<LinkStatusFocus
                        to={to}
                        name={name}
                    />)
                    :
                    (<LinkStatusNoFocus
                        to={to}
                        name={name}
                    />)
            }
        </>
    )
}

const LinkStatusFocus = ({to, name}) => {
    return (
        <div className={styles.statusFont}>
            <div className={styles.accountSettings}>
                <div className={styles.accountSeparator}>
                    <Link to={to} className={styles.a2}>{name}</Link>
                    {/*<div className={styles.accountSeparator}>*/}
                    <div className={styles.accountSeparatorChild}/>
                </div>
            </div>
        </div>
    )
}

const LinkStatusNoFocus = ({to, name}) => {
    return (
        <div className={styles.statusFont}>
            <Link to = {to} className={styles.a}>{name}</Link>
        </div>
    )
}

