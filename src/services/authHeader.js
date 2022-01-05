export default function authHeader() {
    //user 항목에 대한 로컬저장소 확인
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.accessToken) {
        return {Authorization: "Bearer " + user.accessToken};
    } else {
        return {};
    }
}
