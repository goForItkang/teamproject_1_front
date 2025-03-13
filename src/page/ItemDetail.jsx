import styles from '../css/itemDetail.module.css';
import { useParams} from "react-router-dom";
import React, {createContext, useContext, useEffect, useRef, useState} from "react";
import {getItem} from "../api/ItemApi";
import {getChildComments, getItemComments} from "../api/CommentApi";
import {deleteLike, getLikes, postLike} from "../api/LikeApi";
import {LightBox} from "../component/LightBox";
import {createCart} from "../api/CartApi";
import {ShareButton} from "../component/Share";
import {useInView} from "react-intersection-observer";


const ItemDetail = () => {
    return (
        <>
            <ItemContextProvider>
                <ItemCountContextProvider>
                    <div className={styles.body}>
                        <div className={styles['item-container']}>
                            <BuyItemContainer/>
                            <ItemDetailAndReviewContainer/>
                        </div>
                    </div>

                </ItemCountContextProvider>
            </ItemContextProvider>
        </>
    );
};

const BuyItemContainer = () => {
    const {itemId} = useParams();
    const { item, setItem } = useContext(ItemContext);

    const fetchItemDetail = async (itemId) => {
        try {
            const data = await getItem(itemId);
            setItem(data);

            // console.table(data)
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
                <div className={styles['item-detail__item-menu4']}>
                    <ItemEvaluate
                        item={item}
                    />

                    <div>
                        무료 배송
                    </div>
                </div>
                <div className={styles['item-detail__line']}/>

                <ItemQuantityButton/>
                <div className={styles['item-detail__line']}/>

                <ItemCountAndPrice/>

                <ItemBuyButtons/>

            </div>
        </>
    )
}


const ItemPrice = ({item}) => {
    return(
        <div className={styles['item-price']}>

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
                리뷰 {item.commentCount}
                {/*<div>*/}
                {/*    리뷰*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*    {item.commentCount}*/}
                {/*</div>*/}
            </div>
        </div>
    )
}

const ItemQuantityButton = () => {
    const { itemCount, setItemCount } = useContext(ItemCountContext);
    const [ isMinusEnable, setIsMinusEnable ] = useState(false)

    const onClickMinus = () => {
        if(itemCount <= 1){
            return
        }

        setItemCount(itemCount-1);
    }

    const onClickPlus = () => {
        setItemCount(itemCount+1)
    }

    useEffect(() => {
        if(itemCount <= 1)setIsMinusEnable(false)
        else setIsMinusEnable(true)
    },[itemCount])

    return(
        <>
            <div className={styles['item-quantity__input']}>

                {/*<button className={styles['item-quantity__button']}>*/}
                {/*    <div className={styles['item-quantity__input-minus--none']}>*/}
                {/*        -*/}
                {/*    </div>*/}
                {/*</button>*/}

                {/*<button className={styles['item-quantity__button']}>*/}
                {/*    <div className={styles['item-quantity__input-plus--fill']}>*/}
                {/*        +*/}
                {/*    </div>*/}
                {/*</button>*/}

                <div
                    className={styles['item-quantity_input-image-container']}
                    onClick={() => onClickMinus()}
                >
                    <img
                        className={styles['item-quantity__input-image']}
                        src={isMinusEnable === true ? '/images/-icon-minus-fill.svg' : '/images/-icon-minus-none.svg'}
                    />
                </div>

                <div className={styles['item-quantity__input-font']}>
                    {itemCount}
                </div>

                <div
                    className={styles['item-quantity_input-image-container']}
                    onClick = {() => onClickPlus()}
                >
                    <img
                        className={styles['item-quantity__input-image']}
                        src={'/images/-icon-plus-fill.svg'}
                    />
                </div>
            </div>
        </>
    )
}

const ItemBuyButtons = () => {
    const { itemCount } = useContext(ItemCountContext);
    const { item } = useContext(ItemContext);

    const addCart = async () =>{


        const cart = {
            itemId : item.id,
            quantity: itemCount
        }

        const response = await createCart(cart)

        if(!response.ok){
            alert("장바구니에 이미 있습니다");
            return;
        }

        alert("장바구니 넣기 성공");

    }

    const isSubmitPossible = () => {
        return true
        // return false
    }

    return (
        <div className={styles['item-button']}>
            <Button
                isSubmitPossible={isSubmitPossible}
                buttonName="장바구니"
                onClick = {() => addCart()}
            />

            <Button
                isSubmitPossible={isSubmitPossible}
                buttonName="구매"
            />

            {/*<img*/}
            {/*    className={styles['item-button-share']}*/}
            {/*    src={'/images/-icon-share.svg'}*/}
            {/*/>*/}
            <ShareButton
                item={item}
            />
        </div>
    )
}

const Button = ({isSubmitPossible, buttonName, onClick = () => {} }) => {

    const submitStyle = () => {
        if(isSubmitPossible() === true) return "item-detail__button--able"
        return "item-detail__button--disable"

    }


    return (
        <button type = "submit"
                className={styles[submitStyle()]}
                onClick={onClick}
        >
            <b className={styles['item-detail__button--font']}>{buttonName}</b>
        </button>
    )
}


const ItemCountAndPrice = () => {
    const { itemCount, setItemCount } = useContext(ItemCountContext);
    const { item, setItem } = useContext(ItemContext);

    return(
        <>
            <div className={styles['item-detail__item-menu6']}>
                <div className={styles['item-detail__item-menu6-font1']}>
                    총 상품금액
                </div>
                <div>
                    <div className={styles['item-total']}>
                        <div className={styles['item-total__count']}>
                            수량 {itemCount}&nbsp;|&nbsp;
                        </div>
                        {/*<div className={styles['item-total__separator']}>*/}
                        {/*    |*/}
                        {/*</div>*/}
                        <div className={styles['item-total__value']}>
                            {item.itemPrice * itemCount}원
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


const ItemDetailAndReviewContainer = () => {

    const [select, setSelect] = useState(0)

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
                        <ItemDetailImages/> :
                        <Review/>
                }

                {/*<ItemReview/>*/}
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

const ItemDetailImages = () => {

    const { item, setItem } = useContext(ItemContext);

    if(!item){
        return(
            <></>
        )
    }


    return(
        <>
            <div className={styles['image-detail-container']}>
                {
                    item.itemDetailImages.map((image, index) => (
                        <div>
                            <img
                                className={styles['image-detail']}
                                src={image.imageUrl}
                                alt={'no star image'}/>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

const Review = () =>{
    const size = 10;
    const pageRef = new useRef(1)
    const [isCommentEmpty, setIsCommentEmpty] = useState(false)
    const {itemId} = useParams();
    const [comments, setComments] = useState([]);

    const fetchComments = async () => {
        const itemComments = await getItemComments(itemId, size, pageRef.current);
        setComments((prevComments) => [...prevComments, ...itemComments]);
        if(itemComments.length < size){
            setIsCommentEmpty(true)
        }
        pageRef.current++
    };


    const { ref, inView } = useInView({
        threshold: 0.5, // 화면의 50%가 보일 때 감지
    });

    useEffect(() => {
        if(inView && isCommentEmpty === false){
            fetchComments()
        }
    }, [inView])

    return(
        <>
            <div className={styles['comment-container']}>

                {
                    comments.map((comment, index) => (
                    comment.rating !== null &&
                    <CommentParent
                        comment = {comment}
                    />

                    ))
                }
                <div
                    className={styles['blank']}
                    ref={isCommentEmpty === false ? ref : null}
                >

                </div>

            </div>
        </>
    )
}

const CommentChild = ({parentId}) => {
    const [comments, setComments] = useState([])

    const getComments = async(parentId) => {
        const children = await getChildComments(parentId);
        setComments(children)
        // setChildComments(prevState => ({
        //     ...prevState,
        //     [parentId]: children
        // }));
    }

    useEffect(() => {
        getComments(parentId)
    },[])


    return(
        <>

            {
                comments.map((comment,index) => (
                    <div className={styles['comment-child']}>
                        <div>
                            {comment.username}
                        </div>
                        <div className={styles['comment-child__content']}>
                            {comment.content}
                        </div>
                    </div>
                ))
            }
        </>
    )
}

const CommentParent = ({comment}) => {
    // console.table(comment)
    // console.log(comment.commentImages[0])
    const date = new Date(comment.created_date);
    const formattedDate = `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, '0')}. ${String(date.getDate()).padStart(2, '0')}`;


    return(
        <>
            <div>
                <div className={styles['comment-parent']}>
                    <div className={styles['comment-parent__container']}>
                        <div className={styles['comment-parent__user-detail']}>
                            <div>
                                <div className={styles['comment-parent__user-detail--menu1']}>
                                    <div className={styles['comment-parent__user-detail--username']}>
                                        {comment.username}
                                    </div>
                                    <div className={styles['comment-parent__user-detail--review-container']}>
                                        <img
                                            className={styles['comment-parent__user-detail--review-icon']}
                                            src={'/images/-icon-star.svg'}
                                        />
                                        <div className={styles['comment-parent__user-detail--review-value']}>
                                            {comment.rating}
                                        </div>
                                    </div>
                                </div>
                                <div className={styles['comment-parent__user-detail--menu2']}>
                                    <div className={styles['comment-parent__user-detail--content-value']}>
                                        {comment.content}
                                    </div>
                                </div>

                            </div>

                            <div className={styles['comment-parent__user-detail--menu3']}>
                                <div className={styles['comment-parent__user-detail--created-value']}>
                                    등록일 {formattedDate}
                                </div>

                                <Like
                                    commentId={comment.id}
                                />
                            </div>
                        </div>
                        {
                            comment.commentImages !== null && comment.commentImages.length > 0 &&

                            <LightBox
                                imageUrls={comment.commentImages.map((commentImage) => commentImage.imageUrl)}
                            />

                        }
                    </div>
                </div>

                <CommentChild
                    parentId={comment.id}
                />
            </div>
        </>
    )
}



const Like = ({commentId}) => {
    // console.log("commentId : " + commentId)
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchLikes = async () => {
            try {
                setLoading(true);
                const response = await getLikes(commentId);
                setLikes(response.totalLike || 0);
                setIsLiked(response.clicked || false);
            } catch (error) {
                console.error('Error fetching likes:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLikes();
    }, [commentId]);

    const handleLike = async () => {
        try {
            setLoading(true);
            await postLike(commentId);
            setLikes((prev) => prev + 1);
            setIsLiked(true);
        } catch (error) {
            console.error('Error adding like:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUnlike = async () => {
        try {
            setLoading(true);
            await deleteLike(commentId);
            setLikes((prev) => Math.max(0, prev - 1));
            setIsLiked(false);
        } catch (error) {
            console.error('Error removing like:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            className={isLiked ? styles['comment-like__button--clicked'] : styles['comment-like__button--no-clicked']}
            onClick={isLiked ? handleUnlike : handleLike}
            disabled={loading}
        >
            좋아요 {likes}
        </button>
    );
};

const ItemCountContext = createContext(null)

const ItemCountContextProvider = (props) => {
    const [itemCount, setItemCount] = useState(1);

    return (
        <ItemCountContext.Provider value={{itemCount, setItemCount}}>
            {props.children}
        </ItemCountContext.Provider>
    )
}


const ItemContext = createContext(null)

export const ItemContextProvider = (props) => {
    const [item, setItem] = useState('');

    return (
        <ItemContext.Provider value={{item, setItem}}>
            {props.children}
        </ItemContext.Provider>
    )
}



export default ItemDetail