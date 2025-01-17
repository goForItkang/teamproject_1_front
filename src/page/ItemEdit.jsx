import React, {useEffect, useState} from 'react';
import { updateItem, getItem } from '../api/ItemApi';
import { useParams } from 'react-router-dom';  // URL에서 ID를 가져오기 위해
import styles from '../css/itemAdd.module.css';  // CSS 모듈을 import

const ItemEdit = () => {
    const { id } = useParams();  // URL에서 id를 가져옵니다.
    return (
        <div className={styles.formContainer}>
            <ItemUpdateForm itemId={id} />
        </div>
    );
};

const ItemUpdateForm = ({ itemId }) => {
    const [formData, setFormData] = useState({
        id: '',
        itemName: '',
        itemDesc: '',
        itemImg: '',
        itemStock: '',
        itemOriginPrice: '',
        itemBrand: '',
        category: '',
        imageFile: null,
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setFormData({
                ...formData,
                [name]: files[0],
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    // 아이템 정보를 불러오는 함수
    const fetchItemData = async () => {
        try {
            const itemData = await getItem(itemId);  // getItem 호출하여 아이템 데이터 가져오기
            setFormData({
                id: itemData.id,
                itemName: itemData.itemName,
                itemDesc: itemData.itemDesc,
                itemImg : itemData.itemImg,
                itemStock: itemData.itemStock,
                itemOriginPrice: itemData.itemOriginPrice,
                itemBrand: itemData.itemBrand,
                category: itemData.category,
                imageFile: null,  // 이미지 파일은 별도로 처리
            });
        } catch (err) {
            console.error('아이템 정보 불러오기 실패:', err);
            alert('아이템 정보를 불러오는 데 실패했습니다.');
        }
    };

    // 컴포넌트가 마운트되면 아이템 정보를 불러옴
    useEffect(() => {
        if (itemId) {
            fetchItemData();
        }
    }, [itemId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();
        form.append('id', formData.id);
        form.append('itemName', formData.itemName);
        form.append('itemDesc', formData.itemDesc);
        form.append('itemImg', formData.itemImg);
        form.append('itemStock', formData.itemStock);
        form.append('itemOriginPrice', formData.itemOriginPrice);
        form.append('itemBrand', formData.itemBrand);
        form.append('category', formData.category);
        form.append('imageFile', formData.imageFile);

        try {
            console.log(formData.id);
            console.log(formData.itemName);
            console.log(formData.itemDesc);
            console.log(formData.itemImg);
            console.log(formData.itemStock);
            console.log(formData.itemOriginPrice);
            console.log(formData.itemBrand);
            console.log(formData.category);
            console.log(formData.imageFile);

            const response = await updateItem(form);

            if (response) {
                alert('상품 수정 성공');
            }
        } catch (err) {
            console.error(err);
            alert('상품 수정 실패: ' + err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
                <label>상품명</label>
                <input
                    type="text"
                    name="itemName"
                    value={formData.itemName}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className={styles.formGroup}>
                <label>상품 설명</label>
                <textarea
                    name="itemDesc"
                    value={formData.itemDesc}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className={styles.formGroup}>
                <label>상품 재고</label>
                <input
                    type="number"
                    name="itemStock"
                    value={formData.itemStock}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className={styles.formGroup}>
                <label>상품 원가</label>
                <input
                    type="number"
                    name="itemOriginPrice"
                    value={formData.itemOriginPrice}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className={styles.formGroup}>
                <label>상품 브랜드</label>
                <input
                    type="text"
                    name="itemBrand"
                    value={formData.itemBrand}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className={styles.formGroup}>
                <label>카테고리</label>
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                >
                    <option value="">선택하세요</option>
                    <option value="CHEST">가슴</option>
                    <option value="CORE">코어</option>
                    <option value="LEG">다리</option>
                    <option value="ARM">팔</option>
                </select>
            </div>
            <div className={styles.formGroup}>
                <label>상품 이미지 파일</label>
                <input
                    type="file"
                    name="imageFile"
                    onChange={handleChange}
                />
            </div>
            <button type="submit" className={styles.submitButton}>상품 수정</button>
        </form>
    );
};

export default ItemEdit;
