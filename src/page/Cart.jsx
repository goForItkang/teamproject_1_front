
import React, {createContext, useContext, useEffect, useRef, useState} from "react";
import {deleteCart, getCartAll, patchCart} from "../api/CartApi";
import styles from "../css/cart.module.css"
import {useLocation, useNavigate} from "react-router-dom";
import {getItemList} from "../api/ItemApi";
import {SearchContext} from "./ItemList";
import {useInView} from "react-intersection-observer";

const Main =() => {
    return(
        <>
            <CartContextProvider>
                <Cart/>
            </CartContextProvider>
        </>
    )
}

const Cart = () => {
    const {carts, setCarts} = useContext(CartContext);
    const [isEmpty, setIsEmpty] = useState(false)
    const [one, setOne] = useState(false)

    const setIsEmptyHandle =() => {
        if(!carts || carts.length === 0){
            return true
        }
        const isNotEmpty = carts.some((cart) => cart.quantity > 0)
        return !isNotEmpty
    }

    useEffect(() => {
        if(one === false){
            setOne(true)
        }
        else setIsEmpty(setIsEmptyHandle())

    },[carts])

    return(
        <>
            <div className={styles.container}>
                <div className={styles.title}>
                    장바구니
                </div>
                <div className={styles.body}>

                     {/*<>*/}
                     {/*    <CartForm/>*/}
                     {/*    <OrderForm/>*/}
                     {/*</>*/}
                    {
                        isEmpty === false ?
                        (<>
                            <CartForm/>
                            <OrderForm/>
                        </>)
                        :
                            <NoCartForm/>

                    }
                </div>
            </div>
        </>
    )
}

const CartContext = createContext(null)

export const CartContextProvider = (props) => {
    const [carts, setCarts] = useState('');
    const [isCheckedArray, setIsCheckedArray] = useState([])

    return (
        <CartContext.Provider value={{carts, setCarts, isCheckedArray, setIsCheckedArray}}>
            {props.children}
        </CartContext.Provider>
    )
}

const NoCartForm = () => {
    const navigate = useNavigate()

    const moveToMain = () => {
        navigate('/')
    }

    return (
        <>
            <div className={styles['none-container']}>
                <div className={styles['none__menu1']}>
                    <div className={styles['none__font1']}>
                        장바구니가 비어 있습니다.
                    </div>
                    <div className={styles['none__font2']}>
                        마음에 드는 상품을 담아 쇼핑을 시작해 보세요!
                    </div>
                </div>
                <button
                    className={styles['none__button']}
                    onClick={() => moveToMain()}
                >
                    쇼핑 시작하기
                </button>
            </div>
        </>
    )
}

const CartForm = () => {
    const {carts, setCarts} = useContext(CartContext);
    const {isCheckedArray, setIsCheckedArray} = useContext(CartContext);
    const [isNoCart, setIsNoCart] = useState(false)

    const size = 10
    const pageRef = useRef(1);

    const { ref, inView } = useInView({
        threshold: 0.5, // 화면의 50%가 보일 때 감지
    });

    useEffect(() => {
        if(inView && isNoCart === false){
            setCartsHandle()
        }
    },[inView])


    const setCartsHandle = async() => {
        const response = await getCartAll(size,pageRef.current)

        if(!response.ok){
            // alert("장바구니 상품 조회 실패")
            return
        }

        const data = await response.json();
        setCarts((prevCarts) => [...prevCarts, ...data]);
        setIsCheckedArraySize(data.length)
        pageRef.current++
        if(data.length < size){
            setIsNoCart(true)
        }
    }

    const setIsCheckedArraySize = (newArraySize) => {
        setIsCheckedArray((beforeArray) => {
            const newArray = [...beforeArray];
            while (newArray.length < newArraySize) {
                newArray.push(false);
            }
            return newArray;
        });
    }

    return (
        <>
            <div className={styles['item-container']}>
                {
                    carts.length > 0 && carts.map((cart,index) => (
                        cart !== null && cart.quantity !== 0 &&
                        <>
                            <ItemComponent
                                index = {index}
                            />
                        </>
                    ))
                }
                <div className={styles['item-blank']} ref={isNoCart === true ? null : ref}>

                </div>

            </div>
        </>
    )
}


const ItemComponent = ({index}) => {
    const {carts} = useContext(CartContext);
    const {isCheckedArray, setIsCheckedArray} = useContext(CartContext);
    const [ cart, setCart ] = useState('');
    const [isChecked, setIsChecked] = useState(false)

    useEffect(() => {
        setCart(carts[index])
    },[])

    const onClickChecked = () => {
        setIsChecked(!isChecked)
    }

    // const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const setIsCheckedArrayHandle = () => {

        const updatedIsCheckedArray = [...isCheckedArray];
        updatedIsCheckedArray[index] = isChecked;
        setIsCheckedArray(updatedIsCheckedArray);

    }


    // useEffect( () => {
    //     setIsCheckedArrayHandle()
    // }, [isChecked]);


    useEffect(() => {
        setIsCheckedArrayHandle()
    }, [isChecked]);

    if(cart === null){
        return (
            <>
            </>
        )
    }

    return(
        <>
            <div className={styles['item-component']}>
                <div className={styles['item']}>
                    <img
                        className={styles['item__picture']}
                        src={cart.itemImg}
                    />
                    <div className={styles['item__detail']}>
                        <div className={styles['item__detail-menu1']}>
                            {cart.itemName}
                        </div>

                        <div className={styles['item__detail-menu2']}>
                            <div className={styles['item__detail-name-container']}>
                                <div className={styles['item__detail-price']}>
                                    {cart.itemPrice}
                                </div>
                                <div className={styles['item__detail-unit']}>
                                    원
                                </div>
                            </div>
                            <div className={styles['item__detail-delivery']}>
                                무료 배송
                            </div>
                        </div>
                        {/*<div className={styles['item__detail-menu3']}>*/}
                        {/*    {cart.itemName}*/}
                        {/*</div>*/}

                        <ItemQuantityButton
                            index={index}
                        />

                    </div>
                </div>
                <img
                    className={styles['item-icon__check']}
                    src={isChecked === true ? '/images/-icon-check-fill.svg' : '/images/-icon-check-none.svg'}
                    onClick={() => onClickChecked()}
                />
            </div>
        </>
    )
}

const Check = () => {

}


const ItemQuantityButton = ({index}) => {
    const {carts, setCarts} = useContext(CartContext);
    const [ cart, setCart ] = useState('');
    const [ itemCount, setItemCount ] = useState(0)
    const [ isMinusEnable, setIsMinusEnable ] = useState(false)


    useEffect(() => {
        setCart(carts[index])
    }, [])

    useEffect(() => {
        setItemCount(cart.quantity)
    },[cart])


    const onClickMinus = () => {
        if(itemCount <= 1){
            deleteCartHandle(cart.id)
            return
        }

        setItemCount(itemCount-1);
    }

    const onClickPlus = () => {
        setItemCount(itemCount+1)
    }

    const setCartsHandle =  (quantity) => {
        console.log('quantity : ' + quantity)

        const updatedCart = {...cart, quantity}
        setCart(updatedCart)

        setCarts((prevCarts) => {
            const updatedCarts = [...prevCarts];
            updatedCarts[index] = updatedCart;
            return updatedCarts; // 변경된 배열을 반환하여 리렌더링 유도
        });

    }

    const deleteCartHandle = async (cartId) => {
        const response = await deleteCart(cartId)

        if(!response.ok){
            alert("장바구니 삭제에 실패했습니다")
        }
        setCartsHandle(0)
    }

    const patchCartHandle = async (cart) => {
        cart.quantity = itemCount
        const response = await patchCart(cart)

        if(!response.ok){
            alert('장바구니 수정 실패')
            return;
        }

        setCartsHandle(itemCount)
    }


    useEffect(() => {
        if(itemCount <= 1)setIsMinusEnable(false)
        else setIsMinusEnable(true)
    },[itemCount])

    useEffect(() => {
        if(itemCount === undefined || itemCount === 0 || cart === null ||(itemCount === cart.quantity)){
            return
        }

        const timer = setTimeout(()=>{
            patchCartHandle(cart)
        },500)

        //useEffect의 return은 컴포넌트 어마운트 or useEffect 재실행 시에만 동작
        return () => clearTimeout(timer);
    },[itemCount])

    useEffect(() => {
        if(itemCount === undefined || itemCount === 0 || cart === null ||(itemCount === cart.quantity)){
            return
        }

        cart.quantity = itemCount
        setCartsHandle(itemCount)
    },[itemCount])

    if(cart === null){
        return (
            <>
            </>
        )
    }

    return(
        <>
            <div className={styles['item-quantity__input']}>

                <div
                    className={styles['item-quantity__input-image-container']}
                    onClick={() => onClickMinus()}
                >
                    <img
                        className={styles['item-quantity__input-image']}
                        src={isMinusEnable === true ? '/images/-icon-minus-fill.svg' : '/images/-icon-trash.svg'}
                    />
                </div>


                <div className={styles['item-quantity__input-font']}>
                    {itemCount}
                </div>


                <div
                    className={styles['item-quantity__input-image-container']}
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




const OrderForm = () => {
    const [totalOrderPrice, setTotalOrderPrice] = useState(0);
    const [totalShippingPrice, setTotalShippingPrice] = useState(0);
    const {isCheckedArray, setIsCheckedArray} = useContext(CartContext);
    const {carts, setCarts} = useContext(CartContext);

    const submitHandle = () => {
        const submitCartArray = []
        carts.forEach((cart,index) => {
            if (isCheckedArray[index] === true && cart.quantity > 0) {
                submitCartArray.push(cart)
            }
        })

        console.table(submitCartArray)
        return submitCartArray
    }

    const setTotalOrderPriceHandle = () => {
        let totalPriceValue = 0;
        carts.forEach((cart,index) => {
            if (isCheckedArray[index] === true) {
                totalPriceValue += (cart.itemPrice * cart.quantity)
            }
        })
        return totalPriceValue
    }

    useEffect(() => {
        if(carts === null || carts.length === 0){
            return
        }

        const newPrice = setTotalOrderPriceHandle()
        setTotalOrderPrice(newPrice)
    },[isCheckedArray, carts])

    const isSubmitPossible = () =>{
        return totalOrderPrice > 0
    }

    return(
        <>
            <div className={styles['order-container']}>
                <div className={styles['order']}>
                    <div className={styles['order__title']}>
                        주문내역
                    </div>
                    <div className={styles['order__menu-container']}>
                        <div className={styles['order-menu1-menu2-container']}>
                            <div className={styles['order__menu1']}>
                                <div>
                                    총 상품 금액
                                </div>
                                <div>
                                    {totalOrderPrice}원
                                </div>
                            </div>
                            <div className={styles['order__menu2']}>
                                <div>
                                    총 배송비
                                </div>
                                <div>
                                    {totalShippingPrice}원
                                </div>
                            </div>
                        </div>
                        <div className={styles['order__menu--line']}></div>

                        <div className={styles['order__menu3']}>
                            <div className={styles['order__menu3--label']}>
                                총 주문 금액
                            </div>
                            <div className={styles['order__menu3--value']}>
                                {totalOrderPrice + totalShippingPrice}원
                            </div>
                        </div>

                        <SubmitButton
                            isSubmitPossible={() => isSubmitPossible()}
                            buttonName={"구매"}
                            onClick={() => submitHandle()}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

const SubmitButton = ({isSubmitPossible=() => false, buttonName, onClick=()=>null}) => {
    return(
        <>
            <button
                className={isSubmitPossible() === true ? styles['order__button--able'] : styles['order__button--unable']}
                onClick={onClick}
            >
                {buttonName}
            </button>
        </>
    )
}


export default Main;
