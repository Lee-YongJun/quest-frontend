import {SET_MESSAGE, CLEAR_MESSAGE} from "./types";

//서버의 응답 메세지 확인
export const setMessage = (message) => ({
    type: SET_MESSAGE,
    payload: message,
});
//메세지 클리어
export const clearMessage = () => ({
    type: CLEAR_MESSAGE,
});
