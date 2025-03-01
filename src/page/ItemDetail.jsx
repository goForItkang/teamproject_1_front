import styles from '../css/itemDetail.module.css';
import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getItem} from "../api/ItemApi";
import {getItemComments} from "../api/CommentApi";

const ItemDetail = () => {
    return (
        <>
            <div className={styles.body}>
                <BuyItemContainer/>
                <ItemDetailAndReviewContainer/>
            </div>
        </>
    );
};

const BuyItemContainer = () => {
    const { itemId } = useParams();
    const [item, setItem] = useState(null);

    const fetchItemDetail = async (itemId) => {
        try {
            const data = await getItem(itemId);
            setItem(data);
        } catch (error) {
            console.error("상품 상세 정보를 가져오는데 실패했습니다.", error);
        }
    };

    useEffect(() => {
        fetchItemDetail(itemId);
    }, []);



    if(item === null){
        return <p>loading</p>
    }

    return(
        <>
            <div className={styles.item}>
                <img src={item.itemImg} alt={item.itemName} className={styles.item__img}/>
                <BuyItemForm
                    item={item}
                />
            </div>
        </>
    )
}

const BuyItemForm = ({item}) => {

    const isSubmitPossible = () =>{
        return true
    }

    return (
        <>
            <div className={styles['item-detail']}>
                <div className={styles['item-detail__brand']}>
                    {item.itemBrand}
                </div>
                <div className={styles['item-detail__item-name']}>
                    {item.itemName}
                </div>
                <ItemPrice
                    item={item}
                />
                <div className={styles['item-detail__line']} />

                <ItemButtons/>

            </div>
        </>
    )
}

const ItemPrice = ({item}) => {
    return(
        <div className={styles['item-price']}>
            <ItemEvaluate
                item={item}
            />

            <div>
                <span className={styles['item-price__value-number']}>
                    {item.itemPrice}
                </span>
                <span className={styles['item-price__value-unit']}>
                    원
                </span>
            </div>
        </div>
    )
}

const ItemEvaluate = ({item}) => {

    return (
        <div className={styles['item-evaluate']}>
            <div className={styles['item-evaluate__recommend']}>
                <img src='/images/-icon-star.svg' alt={'no star image'}
                     className={styles['item-evaluate__recommend-icon']}/>
                <div>
                    {item.averageRating}
                </div>
            </div>

            <div className={styles['item-evaluate__recommend']}>
                <div>
                    리뷰
                </div>
                <div>
                    {item.commentCount}
                </div>
            </div>
        </div>
    )
}

const ItemButtons = () => {


    const isSubmitPossible = () =>{
        return true
        // return false
    }

    return (
        <div className={styles['item-button']}>
            <Button
                isSubmitPossible={isSubmitPossible}
                buttonName="장바구니"
            />

            <Button
                isSubmitPossible={isSubmitPossible}
                buttonName="구매"
            />
        </div>
    )
}

const Button = ({isSubmitPossible, buttonName}) => {

    const submitStyle = () => {
        if(isSubmitPossible() === true) return "item-detail__button--able"
        return "item-detail__button--disable"

    }


    return (
        <button type = "submit" className={styles[submitStyle()]}>
            <b className={styles['item-detail__button--font']}>{buttonName}</b>
        </button>
    )
}


const ItemDetailAndReviewContainer = () => {

    const [select, setSelect] = useState(-1)

    const menuItems = [
        {name:'상세 정보'},
        {name:'리뷰'}
    ]

    return(
        <>
            <div className={styles['item-extra']}>
                <Choice
                    menus={menuItems}
                    select={select}
                    setSelect={setSelect}
                />

                {
                    select === 0 ?
                        <div/> :
                        <Review/>
                }

                {/*<Review/>*/}
            </div>
        </>
    )
}

const Choice = ({menus, select, setSelect}) => {



    return(
        <>
            <div className={styles['menu-choice']}>
                {
                    menus.map((menu, index) => (
                        <button
                            id = {index}
                            className={select === index ? styles['menu-choice__item--select'] : styles['menu-choice__item--deselect']}
                            onClick = {() => setSelect(index)}
                        >
                            {menu.name}
                        </button>
                    ))
                }
            </div>
        </>
    )
}

const Review = () =>{

    const {itemId} = useParams();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            const itemComments = await getItemComments(itemId);
            setComments(itemComments);
        };

        fetchComments();
    }, [itemId]);


    return(
        <>
            <div>
                hello
            </div>
        </>
    )
}

export default ItemDetail