import App from "./App";
import React from "react";
//store호출
import store from "./store";
import ReactDOM from "react-dom";
//리덕스 Provider사용.(react앱에 store를 손쉽게 연동할수있도록 도와주는 컴포넌트)
import {Provider} from "react-redux";
import setupInterceptors from "./services/setupInterceptors";

//리얼그리드 css
//import '../node_modules/realgrid/dist/realgrid-style.css'
//5. App.js에 store를 넣어준다.
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById("root")
);
//리덕스 저장소를 전달할 수 있는 함수 가져오기
setupInterceptors(store);
