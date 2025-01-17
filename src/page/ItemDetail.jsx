// src/page/ItemDetail.js
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";  // URL 파라미터를 가져오기 위해 사용
import {getItem} from "../api/ItemApi"
import styles from "../css/itemDetail.module.css"; // CSS 모듈


const ItemDetail = () =>{
    return(
        <>
            <ItemDetailForm/>
        </>
    )
}

const ItemDetailForm = () => {
    const { id } = useParams();  // URL 파라미터로 상품 id를 받음
    const [item, setItem] = useState(null);  // 상세 상품 데이터 상태

    // 상품 상세 정보를 가져오는 함수 (예: API 호출)
    const fetchItemDetail = async (id) => {
        try {
            console.log(id)
            const data = await getItem(id)
            setItem(data);
        } catch (error) {
            console.error("상품 상세 정보를 가져오는데 실패했습니다.", error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchItemDetail(id); // id 값 전달
        }  // 상품 상세 정보 로드
    }, [id]);

    if (!item) return <p>상품 정보를 로딩 중...</p>;

    return (
        <div className={styles.container}>
            <div className={styles.imageSection}>
                <img
                    src={item.itemImg}
                    alt={item.itemName}
                    className={styles.itemImage}
                />
            </div>
            <div className={styles.infoSection}>
                <h1 className={styles.itemName}>{item.itemName}</h1>
                <p className={styles.itemDesc}>{item.itemDesc}</p>
                <div className={styles.priceSection}>
                    <span className={styles.originalPrice}>
                        {item.itemOriginPrice.toLocaleString()}원
                    </span>
                    <span className={styles.stock}>
                        재고: {item.itemStock > 0 ? `${item.itemStock}개` : "품절"}
                    </span>
                </div>
                <div className={styles.extraInfo}>
                    <p>브랜드: {item.itemBrand}</p>
                    <p>카테고리: {item.category}</p>
                    <p>평점: {item.itemRating}</p>
                </div>
            </div>
        </div>
    )
};

export default ItemDetail;
