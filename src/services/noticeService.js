//axios
import axios from "axios";
//accessToken
import authHeader from "./authHeader";

//권한별 페이지
const API_URL = "http://localhost:8080/quest/notice/";

//공지사항페이지
const getNoticePage = () => {
    return axios.get(API_URL + "all");
};
//등록
const regNotice = (title, content, writer) => {
    return axios.post(API_URL + "reg", {
        title,
        content,
        writer
    }, {headers: authHeader()});
}

export default {
    getNoticePage,
    regNotice
};