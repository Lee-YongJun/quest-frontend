import React from "react";
import ReactDOM from "react-dom";
//리덕스 Provider사용.
import {Provider} from "react-redux";
import store from "./store";
import App from "./App";
//4. App.js에 store를 넣어준다.
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can chađinge
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

