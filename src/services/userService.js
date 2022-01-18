import api from './api';
//axios
//import axios from "axios";
//accessToken
//import authHeader from "./authHeader";
//권한별 페이지 
//const API_URL = "http://localhost:8080/quest/test/";

//전체페이지
const getPublicContent = () => {
    //return axios.get(API_URL + "all");
    return api.get("/test/all");
};

//유저페이지(유저,관리자가능)
const getUserPage = () => {
    //return axios.get(API_URL + "user", {headers: authHeader()});
    return api.get("/test/user");
};

//관리자페이지
const getAdminPage = () => {
    // return axios.get(API_URL + "admin", {headers: authHeader()});
    return api.get("/test/admin");
};

export default {
    getPublicContent,
    getUserPage,
    getAdminPage,
};