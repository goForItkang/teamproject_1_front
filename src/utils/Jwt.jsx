import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';


const JwtCookie = 'JwtCookie';

// JWT 쿠키를 가져오는 함수
export const getJwt = () => {
    const jwt = Cookies.get(JwtCookie);
    if(!jwt){
        return null
    }

    return `Bearer ${jwt}`;
};

export const getRole = () => {
    try {
        const decoded = jwtDecode(getJwt()); // 페이로드 디코딩
        return decoded.role; // ROLE 정보 추출
    } catch (error) {
        console.error("JWT 파싱 실패:", error);
        return null;
    }
};

export const getEmail = () => {
    try {
        const decoded = jwtDecode(getJwt()); // 페이로드 디코딩
        return decoded.sub; // ROLE 정보 추출
    } catch (error) {
        console.error("JWT 파싱 실패:", error);
        return null;
    }
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