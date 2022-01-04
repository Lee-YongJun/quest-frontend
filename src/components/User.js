//styled컴포넌트
import styled from "styled-components";
//권한별 페이지 서비스
import UserService from "../services/userService";
//react Hooks기능 사용.
import React, {useState, useEffect} from "react";
//유저페이지
const User = () => {
    //상태값초기화
    const [content, setContent] = useState("");

    useEffect(() => {
        UserService.getUserBoard().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setContent(_content);
            }
        );
    }, []);

    return (
        <UserContainer>
            <Jumbotron>
                <h3>{content} header</h3>
            </Jumbotron>
            <UserDiv>
                <h3>{content} 내용</h3>
            </UserDiv>
        </UserContainer>
    );
};
//화면 styled component로 구성.
const UserContainer = styled.div`
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
const UserDiv = styled.div`
  margin-top:10px;
  padding: 2rem 1rem;
  margin-bottom: 2rem;
  background-color: #e9ecef;
  border-radius: 0.3rem;
  text-align:center;
  margin-bottom:auto;
  height:100%;
`;
export default User;
