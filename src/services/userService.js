//axios
import axios from "axios";
//accessToken
import authHeader from "./authHeader";

//권한별 페이지 
const API_URL = "http://localhost:8080/quest/test/";

//전체페이지
const getPublicContent = () => {
    return axios.get(API_URL + "all");
};

//유저페이지(유저,관리자가능)
const getUserBoard = () => {
    return axios.get(API_URL + "user", {headers: authHeader()});
};

//관리자페이지
const getAdminBoard = () => {
    return axios.get(API_URL + "admin", {headers: authHeader()});
};

export default {
    getPublicContent,
    getUserBoard,
    getAdminBoard,
};