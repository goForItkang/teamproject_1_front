import Cookies from 'js-cookie';


const JwtCookie = 'JwtCookie';

// JWT 쿠키를 가져오는 함수
export const getJwt = () => {
    const jwt = Cookies.get(JwtCookie);
    if(!jwt){
        return null
    }

    return `Bearer ${jwt}`;
};

// // JWT 쿠키를 설정하는 함수 (옵션 추가 가능)
// export const setJwtCookie = (value, options = {}) => {
//     Cookies.set(JwtCookie, value, options);
// };
//
// // JWT 쿠키를 삭제하는 함수
// export const removeJwtCookie = () => {
//     Cookies.remove(JwtCookie);
// };