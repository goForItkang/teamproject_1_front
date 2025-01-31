import { getJwt } from '../utils/Jwt';

//
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
const jwt = getJwt();

export const loginGoogle = async () => {
    const ENDPOINT = '/api/login/oauth2/google'
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
            const data = await response.json();
            console.table(data)
            window.location.href = `/signup?${data}`
        }

        return await response.json();
    } catch (error) {
        throw new Error(error.message || '서버와의 연결에 실패했습니다.');
    }
};

export const loginNaver = async () => {
    const ENDPOINT = '/api/login/oauth2/naver'
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
            const data = await response.json();
            console.table(data)
            window.location.href = `/signup?${data}`
        }

        return await response.json();
    } catch (error) {
        throw new Error(error.message || '서버와의 연결에 실패했습니다.');
    }
};