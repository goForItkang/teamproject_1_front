import { getJwt } from '../utils/Jwt';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
const jwt = getJwt();

export const sendEmail = async (email) => {
    console.table(email)

    const ENDPOINT = '/api/email'
    try {
        const response = await fetch(`${BASE_URL}${ENDPOINT}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwt
            },
            body: JSON.stringify({...email}),
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


export const authEmail = async (emailToken) => {
    console.table(emailToken)

    const ENDPOINT = '/api/auth/email'
    try {
        const response = await fetch(`${BASE_URL}${ENDPOINT}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwt
            },
            body: JSON.stringify({...emailToken}),
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