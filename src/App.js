//리액트 훅
import React, {useState, useEffect, useCallback} from "react";
//리덕스 
import {useDispatch, useSelector} from "react-redux";
//부트스트랩
import "bootstrap/dist/css/bootstrap.min.css";
//리액트돔
//Router가 아닌 BrowserRouter사용이유는 Router는 버튼클릭시 router에 해당하는component를 가져오지 못해 사용.
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

//페이지
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import User from "./components/User";
import Admin from "./components/Admin";

import {logout} from "./actions/auth";
import {clearMessage} from "./actions/message";
//react-router이용하여 페이지이동처리.
import {history} from "./helpers/history";

const App = () => {
    //useState : 상태값
    const [showAdminPage, setShowAdminPage] = useState(false);

    const {user: currentUser} = useSelector((state) => state.auth);

    //dispatch 사용하기 위한 준비
    const dispatch = useDispatch();

    //useEffect:어떠한 값의 변화를 감지시 작업 실행.
    useEffect(() => {
        history.listen((location) => {
            dispatch(clearMessage()); // 위치 변경되면 메세지 클리어
        });
    }, [dispatch]);

    //useCallback 특정함수를 만들지 않고 재사용
    const logOut = useCallback(() => {
        //actions/auth에 logout으로 이동.
        dispatch(logout()); //로그아웃.
    }, [dispatch]);

    //권한별로 admin페이지 보여줌.
    useEffect(() => {
        if (currentUser) {
            setShowAdminPage(currentUser.roles.includes("ROLE_ADMIN"));
        } else {
            setShowAdminPage(false);
        }
    }, [currentUser, logOut]);

    return (
        //history추가.
        <Router history={history}>
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark ">
                    <Link to={"/"} className="navbar-brand">
                        I-ON
                    </Link>
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/home"} className="nav-link">
                                Home
                            </Link>
                        </li>

                        {showAdminPage && (
                            <li className="nav-item">
                                <Link to={"/admin"} className="nav-link">
                                    Admin
                                </Link>
                            </li>
                        )}

                        {currentUser && (
                            <li className="nav-item">
                                <Link to={"/user"} className="nav-link">
                                    User
                                </Link>
                            </li>
                        )}
                    </div>

                    {currentUser ? (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/profile"} className="nav-link">
                                    {currentUser.username}님 환영합니다
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a href={"/login"} className="nav-link" onClick={logOut}>
                                    로그아웃
                                </a>
                            </li>
                        </div>
                    ) : (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/login"} className="nav-link">
                                    로그인
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to={"/register"} className="nav-link">
                                    회원가입
                                </Link>
                            </li>
                        </div>
                    )}
                </nav>

                <div className="container mt-3">
                    <Switch>
                        {/* exact는 이하 경로를 중복 출력하지 않도록한다. */}
                        <Route exact path={["/", "/home"]} component={Home}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/profile" component={Profile}/>
                        <Route path="/user" component={User}/>
                        <Route path="/admin" component={Admin}/>
                    </Switch>
                </div>
            </div>
        </Router>
    );
};

export default App;
