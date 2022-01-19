//라우터 링크사용
import {Link} from "react-router-dom";
//리액트 훅스사용
import React, {useCallback, useEffect, useState} from "react";
//리액트 리덕스
import {useDispatch, useSelector} from "react-redux";
//인증 로그아웃사용.
import {logout} from "../actions/auth";

const NavList = () => {
    //useState : 상태값
    const [showAdminPage, setShowAdminPage] = useState(false);

    const {user: currentUser} = useSelector((state) => state.auth);

    //dispatch 사용하기 위한 준비
    const dispatch = useDispatch();

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
                    <Link to={"/userManage"} className="nav-link">
                        회원관리
                    </Link>
                </li>
            )}
            <li className="nav-item">
                <Link to={"/notice"} className="nav-link">
                    게시판
                </Link>
            </li>
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
    )
}
export default NavList;