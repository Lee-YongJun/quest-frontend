import React from "react";
//스타일 컴포넌트
import styled from "styled-components";
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
//화면 styled component로 구성.
const ProfileContainer = styled.div`
    height:1000px;
`;
const Jumbotron = styled.header`
  padding: 2rem 1rem;
  margin-bottom: 2rem;
  background-color: #e9ecef;
  border-radius: 0.3rem;
  text-align:center;
  margin-bottom:auto;
`;
const ProfileDiv = styled.div`
  margin-top:10px;
  padding: 10rem 3rem;
  margin-bottom: 2rem;
  background-color: #e9ecef;
  border-radius: 0.3rem;
  text-align:left;
  margin-bottom:30px;
  height:100%;
  font-size:2rem;
`;
export default Profile;
