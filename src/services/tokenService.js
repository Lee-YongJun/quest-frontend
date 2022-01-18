//TokenService위에서 사용하는 Axios 인스턴스 및 기타 서비스를 생성해야 합니다.
//TokenService브라우저에 저장된 토큰 및 사용자 데이터 작업을 위한 get, set, remove 메소드를 제공합니다.

const getLocalRefreshToken = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.refreshToken;
}

const getLocalAccessToken = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.accessToken;
}

const updateLocalAccessToken = (token) => {
    let user = JSON.parse(localStorage.getItem("user"));
    user.accessToken = token;
    localStorage.setItem("user", JSON.stringify(user));
}

const getUser = () => {
    return JSON.parse(localStorage.getItem("user"));
}

const setUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
}

const removeUser = () => {
    localStorage.removeItem("user");
}
export default {
    getLocalRefreshToken,
    getLocalAccessToken,
    updateLocalAccessToken,
    getUser,
    setUser,
    removeUser,
}