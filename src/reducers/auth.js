import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
} from "../actions/types";

//2. 세부 reducer정의
const user = JSON.parse(localStorage.getItem("user"));

//초기상태
const initialState = user
    ? {isLoggedIn: true, user}
    : {isLoggedIn: false, user: null};

export default function (state = initialState, action) {
    //type:login상태,payload:객체 데이터
    const {type, payload} = action;
    switch (type) {
        case REGISTER_SUCCESS:
            return {
                isLoggedIn: false,
            };
        case REGISTER_FAIL:
            return {
                isLoggedIn: false,
            };
        case LOGIN_SUCCESS:
            return {
                isLoggedIn: true,
                user: payload.user,
            };
        case LOGIN_FAIL:
            return {
                isLoggedIn: false,
                user: null,
            };
        case LOGOUT:
            return {
                isLoggedIn: false,
                user: null,
            };
        //default 쓰지 않을 시 맨 처음 state의 값이 undefined나옴. default넣어야됨.
        default:
            return state;
    }
}
