import React, {useState, useEffect} from "react";

import UserService from "../services/userService";
import EventBus from "../common/EventBus";
import styled from "styled-components";

const User = () => {
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

                if (error.response && error.response.status === 401) {
                    EventBus.dispatch("logout");
                }
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
