import React, { useState } from 'react';
import { createItem } from '../api/ItemApi';
import styles from '../css/itemAdd.module.css';  // CSS 모듈을 import

const ItemAdd = () => {
    return (
        <div className={styles.formContainer}>
            <ItemForm />
        </div>
    );
};

const ItemForm = () => {
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
            const response = await createItem(form);

            if (response) {
                alert('상품 저장 성공');
            }
        } catch (err) {
            console.error(err);
            alert('상품 저장 실패: ' + err.message);
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
                    required
                />
            </div>
            <button type="submit" className={styles.submitButton}>상품 등록</button>
        </form>
    );
};

export default ItemAdd;
