import React, {useState, useEffect} from "react";
import styled from "styled-components";
import UserService from "../services/userService";


const Home = () => {
    const [content, setContent] = useState("");

    useEffect(() => {
        UserService.getPublicContent().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();

                setContent(_content);
            }
        );
    }, []);

    return (

        <HomeContainer>
            <Jumbotron>
                <h3>{content} header</h3>
            </Jumbotron>
            <HomeDiv>
                <h3>{content} 내용</h3>
            </HomeDiv>
        </HomeContainer>

    );
};
const HomeContainer = styled.div`
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
const HomeDiv = styled.div`
  margin-top:10px;
  padding: 2rem 1rem;
  margin-bottom: 2rem;
  background-color: #e9ecef;
  border-radius: 0.3rem;
  text-align:center;
  margin-bottom:auto;
  height:100%;
`;
export default Home;
