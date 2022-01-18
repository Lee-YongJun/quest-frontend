//axios 인터셉터
import axiosInstance from "./api";
//alert창 변경
import Swal from 'sweetalert2'
//refreshToken service 추가
import TokenService from "./tokenService";
//redux action에 refreshToken추가.
import {logout, refreshToken} from "../actions/auth";

const setup = (store) => {
    axiosInstance.interceptors.request.use(
        (config) => {
            const token = TokenService.getLocalAccessToken();

            if (token) {
                config.headers["Authorization"] = 'Bearer ' + token;  //토큰값 백엔드 spring boot 적용
                //config.headers["x-access-token"] = token; // 노드js적용
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    const {dispatch} = store;
    axiosInstance.interceptors.response.use(
        (res) => {
            return res;
        },
        async (err) => {
            const originalConfig = err.config;
            //로그인 했을때
            if (originalConfig.url !== "/auth/signin" && err.response) {
                // 액세스토큰 만료
                if (err.response.status === 401 && !originalConfig._retry) {
                    originalConfig._retry = true;

                    try {
                        const rs = await axiosInstance.post("/auth/refreshtoken", {
                            refreshToken: TokenService.getLocalRefreshToken(),
                        });

                        const {accessToken} = rs.data;
                        dispatch(refreshToken(accessToken));
                        TokenService.updateLocalAccessToken(accessToken);

                        return axiosInstance(originalConfig);
                    } catch (_error) {
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: '토큰이 만료되었습니다.',
                            footer: '다시 로그인 해주세요',
                            showConfirmButton: true,
                            confirmButtonColor: '#F27474',
                        }).then(() => {
                            dispatch(logout());
                            document.location.replace('/login');
                        })
                        return Promise.reject(_error);
                    }
                }
            }
            return Promise.reject(err);
        }
    );
};
export default setup;