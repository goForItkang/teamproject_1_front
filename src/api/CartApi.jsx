import { getJwt } from '../utils/Jwt';


const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
const jwt = getJwt();

export const createCart = async (cart) => {
    //cart.itemId, cart.quantity
    const ENDPOINT = `/api/cart/item`
    try {
        const response = await fetch(`${BASE_URL}${ENDPOINT}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwt
            },
            body: JSON.stringify({...cart}),
            credentials: 'include'
        });

        return response;
    } catch (error) {
        throw new Error(error.message || '서버와의 연결에 실패했습니다.');
    }
};


export const getCartAll = async (size,page) => {
    const ENDPOINT = `/api/cart/items?size=${size}&page=${page}`

    try {
        const response = await fetch(`${BASE_URL}${ENDPOINT}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwt
            },
            credentials: 'include'
        });

        return response;
    } catch (error) {
        throw new Error(error.message || '서버와의 연결에 실패했습니다.');
    }
};


export const deleteCart = async (cartId) => {
    const ENDPOINT = `/api/cart/${cartId}`

    try {
        const response = await fetch(`${BASE_URL}${ENDPOINT}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwt
            },
            credentials: 'include'
        });

        return response;
    } catch (error) {
        throw new Error(error.message || '서버와의 연결에 실패했습니다.');
    }
};


export const patchCart = async (cart) => {
    const ENDPOINT = `/api/cart/item`

    try {
        const response = await fetch(`${BASE_URL}${ENDPOINT}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwt
            },
            body: JSON.stringify({...cart}),
            credentials: 'include'
        });

        return response;
    } catch (error) {
        throw new Error(error.message || '서버와의 연결에 실패했습니다.');
    }
};