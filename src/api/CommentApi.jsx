import { getJwt } from '../utils/Jwt';


const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
const jwt = getJwt();


export const createComment = async (itemId, comment) => {
    const ENDPOINT = `/api/item/${itemId}/comment`
    try {
        const response = await fetch(`${BASE_URL}${ENDPOINT}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwt
            },
            body: JSON.stringify({...comment}),
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

export const createParentComment = async (itemId, commentForm) => {
    //commentForm - content, rating, imageFiles
    const ENDPOINT = `/api/item/${itemId}/comment`
    try {
        const response = await fetch(`${BASE_URL}${ENDPOINT}`,{
            method: 'POST',
            headers: {
                // 'Content-Type': 'application/json',
                'Authorization': jwt
            },
            body: commentForm,
            credentials: 'include'
        });


        return response
    } catch (error) {
        throw new Error(error.message || '서버와의 연결에 실패했습니다.');
    }
};

// export const createItem = async (itemForm) => {
//     const ENDPOINT = '/api/item'
//     try {
//         const response = await fetch(`${BASE_URL}${ENDPOINT}`,{
//             method: 'POST',
//             headers: {
//                 // 'Content-Type': 'multipart/form-data',
//                 'Authorization': jwt
//             },
//             body: itemForm,
//             credentials: 'include'
//         });
//
//         console.table(response)
//         if (!response.ok) {
//             const errorMessage = await response.text();
//             throw new Error(errorMessage);
//         }
//
//         return response
//     } catch (error) {
//         throw new Error(error.message || '서버와의 연결에 실패했습니다.');
//     }
// };

export const getItemComments = async (itemId, size, page) => {
    const ENDPOINT = `/api/item/${itemId}/comments?size=${size}&page=${page}`
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

export const createChildComment = async (id, comment) => {
    const ENDPOINT = `/api/comment/${id}`
    try {
        const response = await fetch(`${BASE_URL}${ENDPOINT}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwt
            },
            body: JSON.stringify({...comment}),
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

export const getChildComments = async (id) => {
    const ENDPOINT = `/api/comment/${id}/replies`
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


export const patchComment = async (comment) => {
    const ENDPOINT = `/api/comment`
    try {
        const response = await fetch(`${BASE_URL}${ENDPOINT}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwt
            },
            body: JSON.stringify({...comment}),
            credentials: 'include'
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }

        return response.ok
    } catch (error) {
        throw new Error(error.message || '서버와의 연결에 실패했습니다.');
    }
};

export const deleteComment = async (id) => {
    const ENDPOINT = `/api/comment/${id}`
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

        return response.ok
    } catch (error) {
        throw new Error(error.message || '서버와의 연결에 실패했습니다.');
    }
};