//화면 css적용하는데 react styled-components사용.
import styled from "styled-components";
//react Hooks기능 사용.
import React, {useState, useEffect} from "react";
//권한별 페이지 서비스
import UserService from "../services/userService";
//관리자페이지
const Admin = () => {
    //상태값 초기화
    const [content, setContent] = useState("");

    useEffect(() => {
        UserService.getAdminPage().then(
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
        <AdminContainer>
            <Jumbotron>
                <h3>{content} header</h3>
            </Jumbotron>
            <AdminDiv>
                <h3>{content} 내용</h3>
            </AdminDiv>
        </AdminContainer>
    );
};
//화면 styled component로 구성.
const AdminContainer = styled.div`
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
const AdminDiv = styled.div`
  margin-top:10px;
  padding: 2rem 1rem;
  margin-bottom: 2rem;
  background-color: #e9ecef;
  border-radius: 0.3rem;
  text-align:center;
  margin-bottom:auto;
  height:100%;
`;
export default Admin;
