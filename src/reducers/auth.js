import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    MODIFY_SUCCESS,
    MODIFY_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    DELETE_SUCCESS,
    DELETE_FAIL,
    REGNOTICE_SUCCESS,
    REGNOTICE_FAIL, REFRESH_TOKEN
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
        case REGNOTICE_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
            }
        case REGNOTICE_FAIL:
            return {
                ...state,
                isLoggedIn: true,
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                isLoggedIn: false,
            };
        case REGISTER_FAIL:
            return {
                ...state,
                isLoggedIn: false,
            };
        case MODIFY_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
            };
        case MODIFY_FAIL:
            return {
                ...state,
                isLoggedIn: true,
            };
        case DELETE_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
            };
        case DELETE_FAIL:
            return {
                ...state,
                isLoggedIn: true,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: payload.user,
            };
        case LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        case REFRESH_TOKEN:
            return {
                ...state,
                user: {...user, accessToken: payload},
            };
        //default 쓰지 않을 시 맨 처음 state의 값이 undefined나옴. default넣어야됨.
        default:
            return state;

    }
}
