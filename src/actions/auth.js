import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    REGNOTICE_SUCCESS,
    REGNOTICE_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
    MODIFY_SUCCESS,
    MODIFY_FAIL,
    DELETE_SUCCESS,
    DELETE_FAIL,
} from "./types";
//인증서비스
import NoticeService from "../services/noticeService";
import AuthService from "../services/authService";
import Swal from "sweetalert2";

// 등록
export const register = (username, password, name, email, phone, postCode, address, detailAddress) => (dispatch) => {

    return AuthService.register(username, password, name, email, phone, postCode, address, detailAddress).then(
        (response) => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: '회원가입에 성공하셨습니다.',
                timer: 3000,
                showConfirmButton: true,
                confirmButtonColor: '#a5dc86',
                footer: 'I-ON홈페이지에 온것을 환영합니다.'
            })
            dispatch({
                type: REGISTER_SUCCESS,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
            });
            //비동기 처리에서 사용되는 객체로 다른코드가 비동기적으로 실행될수 있도록 하는 객체로 resolve사용시 반환.
            return Promise.resolve();
        },
        (error) => {

            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            Swal.fire({
                position: 'center',
                icon: 'error',
                title: '회원가입에 실패하셨습니다.',
                footer: message,
                showConfirmButton: true,
                confirmButtonColor: '#F27474'
            })

            dispatch({
                type: REGISTER_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });
            //값전달 x
            return Promise.reject();
        }
    );
};
export const regNotice = (title, content, writer) => (dispatch) => {

    return NoticeService.regNotice(title, content, writer).then(
        (response) => {
            dispatch({
                type: REGNOTICE_SUCCESS,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
            });
            //비동기 처리에서 사용되는 객체로 다른코드가 비동기적으로 실행될수 있도록 하는 객체로 resolve사용시 반환.
            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: REGNOTICE_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });
            //값전달 x
            return Promise.reject();
        }
    );
};
export const modify = (user) => (dispatch) => {

    return AuthService.modify(user).then(
        (response) => {
            dispatch({
                type: MODIFY_SUCCESS,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
            });
            //비동기 처리에서 사용되는 객체로 다른코드가 비동기적으로 실행될수 있도록 하는 객체로 resolve사용시 반환.
            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: MODIFY_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });
            //값전달 x
            return Promise.reject();
        }
    );
};
//회원삭제
export const deleteUser = (id) => (dispatch) => {
    return AuthService.deleteUser(id).then(
        (data) => {
            dispatch({
                type: DELETE_SUCCESS,
                payload: {user: data},
            });

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: DELETE_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};
//로그인
export const login = (username, password) => (dispatch) => {
    return AuthService.login(username, password).then(
        (data) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {user: data},
            });

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: LOGIN_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};
//로그아웃
export const logout = () => (dispatch) => {
    //로그아웃 처리
    AuthService.logout();

    dispatch({
        type: LOGOUT,
    });
};
