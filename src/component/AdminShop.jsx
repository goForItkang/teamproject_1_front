import React, { useEffect, useState } from 'react';
import {useLocation, useParams} from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import PageBar from './PageBar'; // PageBar 컴포넌트 불러오기

const AdminShop = () => {
    const parameter = useParams();
    const [item, setItem] = useState([]);
    const [searchData, setSearchData] = useState('');

    const [totalData, setTotalData] = useState(0); // 전체 데이터 수
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const size = 3; // 한 페이지에 보여줄 아이템 수
    const path = useLocation().pathname;
    const JwtCookie = 'JwtCookie';
    const getJwtCookie = () => {
        return Cookies.get(JwtCookie);
    };
    const jwtCookie = getJwtCookie();

    // 데이터 가져오기
    useEffect(() => {

        const search = searchData;
        if(searchData === '' ){
        axios.get("http://localhost:8080/api/admin/item/findAll", {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${jwtCookie}`
            },
            params: {
                size: size,
                page: currentPage
            }
        })
            .then((res) => {
                setTotalData(res.data[0].totalData); // 전체 데이터 수
                setItem(res.data); // 현재 페이지의 데이터
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
        }else{
            axios.get("http://localhost:8080/api/admin/item/find", {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${jwtCookie}`
                },
                params: {
                    size: size,
                    page: currentPage,
                    itemName : searchData
                }
            })
                .then((res) => {
                    setTotalData(res.data[0].totalData); // 전체 데이터 수
                    setItem(res.data); // 현재 페이지의 데이터
                    console.log(res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        }

    }, [currentPage,searchData]); // currentPage 변경 시 데이터를 다시 가져옴


    // 페이지 변경 함수
    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <div>
                <input type="text" onChange={(e) => setSearchData(e.target.value)} />
            </div>
                <button >조회</button>
            <div>
                {/* 상품 리스트 출력 */}
                {item.length > 0 ? (
                    <ul>
                        {item.map((item) => (
                            <li key={item.id}>
                                <h3>{item.itemName}</h3>
                                <p>{item.itemDesc}</p>
                                <img src={item.itemImg} alt={item.itemName} style={{ width: '100px', height: '100px' }} />
                                <p>원가: {item.itemOriginPrice}</p>
                                <p>판매가 : {item.itemPrice}</p>
                                <p>재고: {item.itemStock}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>검색된 상품이 없습니다.</p>
                )}
            </div>

            {/* 페이지 바 컴포넌트 */}
            <PageBar
                totalData={totalData}
                currentPage={currentPage}
                size={size}
                onPageChange={onPageChange} // 페이지 변경 함수 전달
            />
        </div>
    );
};

export default AdminShop;
