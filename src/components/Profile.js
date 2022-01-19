//스타일 컴포넌트
import{
    ProfileContainer,
    Jumbotron,
    ProfileDiv
} from "../styles/styledProfile";
//리액트
import React from "react";
//리덕스 useSelector: 리덕스의 state를 조회할 수 있다.
import {useSelector} from "react-redux";
//router redirect링크 처리
import {Redirect} from 'react-router-dom';
//정보 페이지
const Profile = () => {
    const {user: currentUser} = useSelector((state) => state.auth);
    //현재 유저정보없을때는 로그인페이지 이동
    if (!currentUser) {
        return <Redirect to="/login"/>;
    }
    return (
        <ProfileContainer>
            <Jumbotron>
                <h3>
                    <strong>{currentUser.username}</strong> 정보
                </h3>
            </Jumbotron>
            <ProfileDiv>
                <p>
                    <strong>Token값:</strong> {currentUser.accessToken.substring(0, 20)} ...
                    {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
                </p>
                <p>
                    <strong>Id값:</strong> {currentUser.id}
                </p>
                <strong>권한:</strong>
                <ul>
                    {currentUser.roles &&
                        currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
                </ul>
            </ProfileDiv>
        </ProfileContainer>
    );
};
export default Profile;
