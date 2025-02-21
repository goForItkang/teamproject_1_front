import { useEffect, useState } from "react";
import {deleteItem, getItemList} from "../api/ItemApi";
import styles from '../css/itemList.module.css';
import {Link, useNavigate} from "react-router-dom";  // CSS 모듈 import
import {getRole} from '../utils/Jwt'

const ItemList = () => {
    return (
        <div className={styles.container}>
            <ItemListForm />
        </div>
    );
}

const ItemListForm = () => {
    const [items, setItems] = useState([]);  // 상품 리스트 상태
    const [loading, setLoading] = useState(true);  // 로딩 상태
    const [error, setError] = useState(null);  // 오류 상태
    const [page, setPage] = useState(1);  // 현재 페이지 상태
    const [size, setSize] = useState(10);  // 페이지당 아이템 개수 (기본값 10)
    const navigate = useNavigate();
    const [user, setUser] = useState("");

    // 상품 리스트를 가져오는 함수
    const fetchItemList = async () => {
        try {
            setLoading(true);
            const data = await getItemList(size, page);
            setItems(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() =>{
        const role = getRole()
        console.log("Role from getRole: ", role);
        setUser(role);
    }, [])

    // 페이지가 변경될 때마다 상품 리스트를 다시 가져옴
    useEffect(() => {
        fetchItemList();  // 비동기 호출
    }, [page, size]); // fetchItemList, page, size 변경 감지

    // 페이지 변경 핸들러
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    // 페이지당 항목 개수 변경 핸들러
    const handleSizeChange = (newSize) => {
        setSize(newSize);
    };

    // 삭제 버튼 클릭 핸들러
    const handleDelete = async (id, itemImg) => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            try {
                await deleteItem(id, itemImg); // 삭제 API 호출
                setItems(items.filter((item) => item.id !== id)); // 리스트에서 제거
            } catch (err) {
                console.error("삭제에 실패했습니다.", err);
                alert("삭제 중 오류가 발생했습니다.");
            }
        }
    };

    // 수정 버튼 클릭 핸들러.
    const handleEdit = (id) => {
        navigate(`/admin/item/edit/${id}`); // 수정 페이지로 이동
    };

    return (
        <div>
            <h1 className={styles.title}>상품 리스트</h1>

            {loading && <p className={styles.loading}>로딩 중...</p>}
            {error && <p className={styles.error}>오류: {error}</p>}

            <div className={styles.sizeSelect}>
                <select onChange={(e) => handleSizeChange(Number(e.target.value))} value={size}>
                    <option value={5}>5개</option>
                    <option value={10}>10개</option>
                    <option value={20}>20개</option>
                </select>
            </div>

            {items && items.length > 0 ? (
                <ul className={styles.itemList}>
                    {items.map((item) => (
                        <div>

                            <li key={item.id}>
                                <div className={styles.itemImageSection}>
                                    <img src={item.itemImg} alt={item.itemName} className={styles.img}/>
                                </div>

                                <h3>{item.itemName}</h3>
                                <p>{`평점 : ${item.averageRating}`}</p>
                                <p>{item.category}</p>
                                <p>{item.itemDesc}</p>
                                <p className={styles.price}>{item.itemPrice} 원</p>
                                <Link to={`/item/${item.id}`} className={styles.link}>상세보기</Link>


                                {/*/!*ADMIN 사용자로 제한 예정*!/*/}
                                {/*{(user === "ROLE_ADMIN" || user === "ROLE_USER") && (*/}
                                {/*    <>*/}
                                {/*        <button*/}
                                {/*            className={styles.editButton}*/}
                                {/*            onClick={() => handleEdit(item.id)}>*/}
                                {/*            수정*/}
                                {/*        </button>*/}
                                {/*        <button*/}
                                {/*            className={styles.deleteButton}*/}
                                {/*            onClick={() => handleDelete(item.id, item.itemImg)}>*/}
                                {/*            삭제*/}
                                {/*        </button>*/}
                                {/*    </>*/}
                                {/*)}*/}

                            </li>
                        </div>
                    ))}
                </ul>
            ) : (
                <p>상품이 없습니다.</p>
            )}

            <div className={styles.pagination}>
                <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
                    이전
                </button>
                <span>페이지 {page}</span>
                <button onClick={() => handlePageChange(page + 1)} disabled={items.length < size}>
                    다음
                </button>
            </div>
        </div>
    );
};

export default ItemList;
