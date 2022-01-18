import api from "./api";
import TokenService from "./tokenService";

//회원가입
const register = (username, password, name, email, phone, postCode, address, detailAddress) => {
    return api.post("/auth/signup", {
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

    return api.put("/auth/modify", {
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
    return api.delete(`/auth/${id}`, {
        data: {id: id}
    }).then(response => {
        return response.data
    })
}
//유저리스트
//유저페이지(관리자가능)
const getUserList = () => {
    return api.get("/auth/paging");
};
//로그인
const login = (username, password) => {
    return api
        .post("/auth/signin", {
            username,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                TokenService.setUser(response.data);
            }
            return response.data;
        });
};
//로그아웃
const logout = () => {
    TokenService.removeUser();
};
const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
}

export default {
    deleteUser,
    modify,
    getUserList,
    register,
    login,
    logout,
    getCurrentUser
};
