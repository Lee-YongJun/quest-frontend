//axios
import axios from "axios";
//인증서비스
const API_URL = "http://localhost:8080/quest/auth/";

//회원가입
const register = (username, password) => {
    return axios.post(API_URL + "signup", {
        username,
        password,
    });
};

//로그인
const login = (username, password) => {
    return axios
        .post(API_URL + "signin", {
            username,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
};
//로그아웃
const logout = () => {
    localStorage.removeItem("user");
};

export default {
    register,
    login,
    logout,
};
