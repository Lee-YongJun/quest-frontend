//리듀서 묶어주는 기능 
import {combineReducers} from "redux";
//인증서비스
import auth from "./auth";
//메세지처리
import message from "./message";

//1. root 리듀서 정의
//여러 reducer를 사용하는 경우 reducer를 하나로 묶어주는 메소드
//store에 저장되는 리듀서는 오직한개.
//userselector에서 auth와 message출력할 수 있다.
export default combineReducers({
    auth,
    message,
});