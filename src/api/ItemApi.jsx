import { getJwt } from '../utils/Jwt';


//
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
const jwt = getJwt();


export const createItem = async (itemForm) => {
    const ENDPOINT = '/api/item'
    try {
        const response = await fetch(`${BASE_URL}${ENDPOINT}`,{
            method: 'POST',
            headers: {
                // 'Content-Type': 'multipart/form-data',
                'Authorization': jwt
            },
            body: itemForm,
            credentials: 'include'
        });

        console.table(response)
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }

        return response
    } catch (error) {
        throw new Error(error.message || '서버와의 연결에 실패했습니다.');
    }
};


export const getCategory = async () => {
    const ENDPOINT = '/api/category'
    try {
        const response = await fetch(`${BASE_URL}${ENDPOINT}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwt
            },
            credentials: 'include'
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }

        return await response.json();
    } catch (error) {
        throw new Error(error.message || '서버와의 연결에 실패했습니다.');
    }
};

export const deleteItem = async (id, itemImg) => {
    const ENDPOINT = `/api/item?id=${id}&itemImg=${itemImg}`
    try {
        const response = await fetch(`${BASE_URL}${ENDPOINT}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwt
            },
            credentials: 'include'
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }

        return response.ok;
    } catch (error) {
        throw new Error(error.message || '서버와의 연결에 실패했습니다.');
    }
};

export const updateItem = async (itemForm) => {
    const ENDPOINT = '/api/item'
    try {
        const response = await fetch(`${BASE_URL}${ENDPOINT}`,{
            method: 'PATCH',
            headers: {
                // 'Content-Type': 'application/json',
                'Authorization': jwt
            },
            body: itemForm,
            credentials: 'include'
        });

        //
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }

        return await response.text();
    } catch (error) {
        throw new Error(error.message || '서버와의 연결에 실패했습니다.');
    }
};

//
export const getItemList = async (size, page, sort) => {
    // sort = new, cheap, expensive, review, recommend
    const ENDPOINT = `/api/item?size=${size}&page=${page}&sort=${sort}`
    try {
        const response = await fetch(`${BASE_URL}${ENDPOINT}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwt
            },
            credentials: 'include'
        });

        if (!response.ok) {
            return false;
        }

        // return response
        return await response.json();
    } catch (error) {
        throw new Error(error.message || '서버와의 연결에 실패했습니다.');
    }
};


export const getItem = async (id) => {
    const ENDPOINT = `/api/item/${id}`
    try {
        const response = await fetch(`${BASE_URL}${ENDPOINT}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwt
            },
            credentials: 'include'
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }

        return await response.json();
    } catch (error) {
        throw new Error(error.message || '서버와의 연결에 실패했습니다.');
    }
};