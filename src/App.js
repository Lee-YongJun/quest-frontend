//리액트 훅
import React, {useState, useEffect, useCallback} from "react";
//리덕스 
import {useDispatch, useSelector} from "react-redux";
//리액트돔
import {Router, Switch, Route, Link} from "react-router-dom";
//부트스트랩
import "bootstrap/dist/css/bootstrap.min.css";

//페이지
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import User from "./components/User";
import Admin from "./components/Admin";

import {logout} from "./actions/auth";
import {clearMessage} from "./actions/message";

import {history} from "./helpers/history";
// 컴포넌트에서 redux사용하기
import EventBus from "./common/EventBus";

const App = () => {
    const [showAdminBoard, setShowAdminBoard] = useState(false);

    const {user: currentUser} = useSelector((state) => state.auth);
    //dispatch 사용하기 위한 준비
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location) => {
            dispatch(clearMessage()); // 위치 변경되면 메세지 클리어
        });
    }, [dispatch]);

    const logOut = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    useEffect(() => {
        if (currentUser) {
            setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
        } else {
            setShowAdminBoard(false);
        }

        EventBus.on("logout", () => {
            logOut();
        });

        return () => {
            EventBus.remove("logout");
        };
    }, [currentUser, logOut]);

    return (
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

                        {showAdminBoard && (
                            <li className="nav-item">
                                <Link to={"/admin"} className="nav-link">
                                    Admin Board
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
                                <a href="/login" className="nav-link" onClick={logOut}>
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
