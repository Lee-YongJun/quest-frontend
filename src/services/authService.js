//axios
import axios from "axios";
import authHeader from "./authHeader";
//인증서비스
const API_URL = "http://localhost:8080/quest/auth/";

//회원가입
const register = (username, password, name, email, phone, postCode, address, detailAddress) => {
    return axios.post(API_URL + "signup", {
        username,
        password,
        name,
        email,
        phone,
        postCode,
        address,
        detailAddress
    });
};
//회원수정
const modify = (user) => {
    return axios.put(API_URL + "modify", {
        username: user.username,
        password: user.password,
        name: user.name,
        email: user.email,
        phone: user.phone,
        postCode: user.postCode,
        address: user.address,
        detailAddress: user.detailAddress,
        updatedAt: user.updatedAt
    }).then((response) => {
        return response.data;
    });
};
//회원삭제
const deleteUser = (id) => {
    return axios.delete(`http://localhost:8080/quest/auth/${id}`, {
        data: {id: id}
    }).then(response => {
        return response.data
    })
}
//유저리스트
//유저페이지(관리자가능)
const getUserList = () => {
    return axios.get(API_URL + "paging", {headers: authHeader()});
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
    deleteUser,
    modify,
    getUserList,
    register,
    login,
    logout,
};
