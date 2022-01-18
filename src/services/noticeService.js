import api from "./api";

//공지사항페이지
const getNoticePage = () => {
    return api.get("/notice/all");
};
//등록
const regNotice = (title, content, writer) => {

    return api.post("/notice/reg", {
        title,
        content,
        writer
    });

}

export default {
    getNoticePage,
    regNotice
};