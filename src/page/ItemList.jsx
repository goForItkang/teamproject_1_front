import {createContext, useContext, useEffect, useRef, useState} from "react";
import {getItemList} from "../api/ItemApi";
import styles from '../css/itemList.module.css';
import {Link, useLocation, useNavigate} from "react-router-dom";  // CSS 모듈 import


const ItemList = () => {


    return (
            <div className={styles.body}>
                <div className={styles['form-container']}>
                    <SortingForm />
                    <ItemsForm/>
                </div>
            </div>
    );
}

export const ItemsForm = () => {
    // const {sortRef} = useContext(MenuSortContext)
    const { search, setSearch } = useContext(SearchContext);
    const [items, setItems] = useState([]);  // 상품 리스트 상태
    const [page, setPage] = useState(1);  // 현재 페이지 상태
    const [size, setSize] = useState(10);  // 페이지당 아이템 개수 (기본값 10)
    const [isNoItem, setIsNoItem] = useState(false)
    const navigate = useNavigate();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const sort = searchParams.get('sort');

    // page의 최신 값을 저장할 ref
    const pageRef = useRef(page);
    const sortRef = useRef(sort);
    const target = useRef(null);

    const reloadItem =  () => {
        setPage(1)
        setItems([])
    }


    useEffect(() => {
        reloadItem()
    }, [sort]);


    // page가 변경될 때마다 ref 업데이트
    useEffect(() => {
        pageRef.current = page;
    }, [page]);


    useEffect(() => {
        sortRef.current = sort;
    }, [sort]);




    // IntersectionObserver 콜백 함수에서 최신 page 값 사용
    const callback = async () => {
        //useState X (비동기 상황에서 값이 함수에 따라 달라 질 수 있음

        const data = await getItemList(size, pageRef.current, sortRef.current);
        if(data === false){
            return
        }

        // if(response.length === 0){
        //     // observer.current.disconnect();
        //     return
        // }
        setItems((prevItems) => [...prevItems, ...data]);
        setPage(prev => prev + 1); // 함수형 업데이트로 최신 값 기반으로 증가
    };



    const options = {
        threshold: 1.0,
    };

    // observer는 useRef로 관리
    const observer = useRef(new IntersectionObserver(callback, options));


    useEffect(() => {
        if(search === null){
            setIsNoItem(true)
        }


        else if (target.current) {
            // observer가 초기화된 후 observe 호출
            //target.current 감지
            observer.current.observe(target.current);
        }

        // cleanup function: unobserve를 호출하여 메모리 누수를 방지
        // return () => {
        //     if (target.current) {
        //         observer.current.unobserve(target.current);
        //     }
        // };
    }, []);

    useEffect(() => {
        if(search === null){
            setIsNoItem(true)
        }

        else if(search.length !== 0){
            setIsNoItem(false)
            setItems(search)
            setSearch('');
        }

    }, [search]);

    return(
        <>
            {
                isNoItem === true ? <NoItems/> :

                <div className={styles.items}>

                    {items.map((item) => (
                        <Item
                            item={item}
                            onClick={() => navigate(`/item/${item.id}`)}
                        />
                    ))
                    }

                    <div className={styles.items__loading} ref={target}>
                        {/* 스크롤 이벤트를 감지할 대상 요소 */}
                    </div>
                </div>
            }


        </>
    )
}

const NoItems = () =>{
    const { searchContent } = useContext(SearchContext);

    console.log('search : ' + searchContent);
    return(
        <div className={styles['no-item-container']}>
            <div className={styles['no-item-container__font1']}>
                '{searchContent}'에 대한 검색 결과가 없습니다.
            </div>
            <div className={styles['no-item-container__content']}>
                <div className={styles['no-item-container__font2']}>
                    해당 상품이 품절되었거나 등록되지 않았습니다.
                </div>
                <div className={styles['no-item-container__font2']}>
                    다른 키워드로 검색해 주세요.
                </div>
            </div>
        </div>
    )
}

const Item = ({item, onClick}) => {
    return (
        <div className={styles['item-container']} onClick = {onClick}>
            <div className={styles.item}>
                <img src={item.itemImg} alt={item.itemName} className={styles.item__image}/>
                <div className={styles.item__brand}>
                    {item.itemBrand}
                </div>
                <div className={styles.item__name}>
                    {item.itemName}
                </div>
                <div className={styles.item__price}>
                    {`${item.itemPrice}원`}
                </div>
                <div className={styles.item__delivery}>
                    배송비 0원
                </div>
                <div className={styles.item__review}>
                    <div>
                        <img src='/images/-icon-star.svg' alt={'no star image'}/>
                        {item.averageRating !== null ? item.averageRating : 0}
                    </div>
                    <div>
                        리뷰 {item.commentCount !== null ? item.commentCount : 0}
                    </div>
                </div>
            </div>

        </div>
    )
}


export const SortingForm = () => {
    return (
        <div className={styles.filter}>
            <MenuSorting/>
            {/*<MenuDelivery/>*/}
        </div>
    )
};

const MenuSorting = () => {
    const menuItems = [
        { name: '추천순', post: 'recommend', isFocused: true },
        { name: '리뷰순', post: 'review', isFocused: false },
        { name: '최신순', post: 'new', isFocused: false },
        { name: '최소 금액순', post: 'cheap', isFocused: false },
        { name: '최대 금액순', post: 'expensive', isFocused: false }
    ];

    const [select, setSelect] = useState(-1);


    return (
        <>
            <div className={styles.menu}>

                {menuItems.map((item, index) => (
                    <Link
                        key={index}
                        className={index === select ? styles['menu__item-sort--focused'] : styles['menu__item-sort']}
                        to = {`/items?sort=${item.post}`}
                        onClick = {() => setSelect(index)}
                    >
                        {item.name}
                    </Link>
                ))}

            </div>
        </>
    )
}


const MenuDelivery = () => {

    const deliveryOptions = [
        { id: 1, label: '무료배송'},
        { id: 2, label: '해외직구'},
    ];

    const [selectedId, setSelectedId] = useState(null);

    const handleClick = (id) => {
        setSelectedId(id)
    }

    return (
        <>
            <div className={styles.menu}>
                {
                    deliveryOptions.map((option) => (
                        <div className={styles['menu__item-delivery-box']} onClick = {() => handleClick(option.id)}>
                            <div className={styles['menu__item-delivery-button']}>
                                {option.label}
                            </div>
                            {
                                selectedId === option.id ?
                                    (<img src="/images/-icon-checkBox-fill.svg" alt="no image"/>) :
                                    (<img src="/images/-icon-checkBox-none.svg" alt="no image"/>)
                            }
                        </div>
                        )
                    )
                }

            </div>
        </>
    )
}


export const SearchContext = createContext(null)

export const SearchContextProvider = (props) => {

    const [search, setSearch] = useState('');
    const [searchContent, setSearchContent] = useState('');

    return (
        <SearchContext.Provider value={{search, setSearch, searchContent, setSearchContent}}>
            {props.children}
        </SearchContext.Provider>
    )
}


export default ItemList;
