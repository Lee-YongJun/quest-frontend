import {combineReducers} from "redux";
import auth from "./auth";
import message from "./message";

//1. root 리듀서 정의
//여러 reducer를 사용하는 경우 reducer를 하나로 묶어주는 메소드
//store에 저장되는 리듀서는 오직한개.

export default combineReducers({
    auth,
    message,
});