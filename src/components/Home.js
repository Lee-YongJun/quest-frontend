//화면 css적용하는데 react styled-components사용.
import {
    HomeContainer,
    HomeDiv,
    Jumbotron
} from "../styles/styledHome"
//react Hooks기능 사용.
import React, {useState, useEffect} from "react";
//권한별 페이지 서비스
import UserService from "../services/userService";
//메인페이지
const Home = () => {
    //상태값 초기화
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
                <h3>{content}내용</h3>
            </HomeDiv>
        </HomeContainer>

    );
};
export default Home;
