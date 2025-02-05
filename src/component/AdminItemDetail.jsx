import React, {use, useEffect, useState} from 'react';
import axios from "axios";
import {useLocation} from "react-router-dom";
import Cookies from "js-cookie";
import "../css/adminItemDetail.css"
const AdminItemDetail = () => {
    const path = useLocation().pathname;
    const jwtCookie = Cookies.get('JwtCookie');
    const [item,setItem]  = useState({});
    const[ratingAvg,setRatingAvg] = useState(0);
    const [commentCount,setCommentCount] = useState(0);
    // console.log(`http://localhost:8080/api${path}`);
    useEffect(() => {
        const fetchData =  async () =>{
            try{
                const res = await axios.get(`http://localhost:8080/api${path}`,{
                    headers : {
                        "Content-Type" : "application/json",
                        "Authorization" : `Bearer ${jwtCookie}`
                    }
                });
                setItem(res.data.itemData);
                console.log(res.data.itemData);
                setCommentCount(res.data.commentCount)
                console.log(res.data.commentCount);
                setRatingAvg(res.data.ratingAvg)
            }catch (err){
                console.log(err);
            }
        }
        if(jwtCookie){
            fetchData();
        }

    }, [path,jwtCookie]);
    return (
        <div id={"admin-item-details-div"}>
            <div id={"admin-item-details"}>
                <h2>상품명:</h2>
                <h2>{item.itemName}</h2>
            </div>
            <div id={"admin-item-img-div"}>
                <img src={item.itemImg} alt=""/>
                <p>{item.itemDesc}</p>
            </div>
            <div id={"admin-item-info-div"}>
                <div>
                    <div>
                        <p className={"item-details-info"}>원가 : {item.itemOriginPrice}</p>
                    </div>
                    <div>
                        <p className={"item-details-info"}>판매가 : {item.itemPrice}</p>
                    </div>
                </div>
                <div>
                    <div>
                        <p className={"item-details-info"}>재고 : {item.itemStock}개</p>
                    </div>
                    <div>
                        <p className={"item-details-info"}>판매수량 : 수정부분</p>
                    </div>

                </div>
                <div>
                    <div>
                        <p className={"item-details-info"}>평점 : {ratingAvg}</p>
                    </div>
                    <div>
                        <p className={"item-details-info"}>전체 댓글수 : {commentCount}</p>
                    </div>
                </div>
            </div>
            <div id={"chart"}>
                차트부분 ex) 연령, 년도 로 구분할예정
            </div>
        </div>
    );
};

export default AdminItemDetail;