import {createStore, applyMiddleware} from "redux";
//객체대신 함수를 생성하는 액션생성 함수를 작성할 수있게 도와줌
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const middleware = [thunk];

//6.store생성
const store = createStore(
    rootReducer,
    applyMiddleware(...middleware)
);

export default store;
