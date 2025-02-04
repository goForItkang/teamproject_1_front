import { getJwt } from '../utils/Jwt';

//
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
const jwt = getJwt();

export const getUser = async () => {
    const ENDPOINT = '/api/user'
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



export const getUserByEmail = async (email) => {
    const ENDPOINT = `/api/user/${email}`
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
            return null;
        }

        return await response.json();
    } catch (error) {
        throw new Error(error.message || '서버와의 연결에 실패했습니다.');
    }
};


export const patchUser = async (user) => {
    const ENDPOINT = '/api/user'
    try {
        const response = await fetch(`${BASE_URL}${ENDPOINT}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwt
            },
            body: JSON.stringify({...user}),
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


export const patchPassword = async (password) => {
    const ENDPOINT = '/api/user/profile/password'
    try {
        const response = await fetch(`${BASE_URL}${ENDPOINT}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwt
            },
            body: JSON.stringify({password}),
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

export const patchForgotPassword = async (email, password) => {
    const ENDPOINT = '/api/user/password'
    try {
        const response = await fetch(`${BASE_URL}${ENDPOINT}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwt
            },
            body: JSON.stringify({email, password}),
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