import App from "./App";
import React from "react";
//store호출
import store from "./store";
import ReactDOM from "react-dom";
//리덕스 Provider사용.(react앱에 store를 손쉽게 연동할수있도록 도와주는 컴포넌트)
import {Provider} from "react-redux";

//5. App.js에 store를 넣어준다.
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can chađinge
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

