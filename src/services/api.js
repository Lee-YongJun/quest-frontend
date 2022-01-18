import axios from "axios";

//React Redux 앱의 Axios 인터셉터

const instance = axios.create({
    baseURL: "http://localhost:8080/quest",
    headers: {
        "Content-Type": "application/json",
    },
});

export default instance;