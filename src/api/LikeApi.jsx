import { getJwt } from '../utils/Jwt';


const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
const jwt = getJwt();

export const getLikes = async (commentId) => {
    const ENDPOINT = `/api/comment/${commentId}/like`
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


export const postLike = async (commentId) => {
    const ENDPOINT = `/api/comment/like?commentId=${commentId}`
    try {
        const response = await fetch(`${BASE_URL}${ENDPOINT}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwt
            },
            // body: JSON.stringify(commentId),
            credentials: 'include'
        });

        //
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }

        return response.ok;
    } catch (error) {
        throw new Error(error.message || '서버와의 연결에 실패했습니다.');
    }
};


export const deleteLike = async (commentId) => {
    const ENDPOINT = `/api/comment/like?commentId=${commentId}`
    try {
        const response = await fetch(`${BASE_URL}${ENDPOINT}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwt
            },
            // body: JSON.stringify(commentId),
            credentials: 'include'
        });

        //
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }

        return response.ok;
    } catch (error) {
        throw new Error(error.message || '서버와의 연결에 실패했습니다.');
    }
};