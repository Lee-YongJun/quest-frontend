//화면 styled component로 구성.
import styled from "styled-components";

export const Toolbar = styled.div`
    margin-top:6rem;
`;
//회원관리 글씨
export const UserManageH3 = styled.div`
    width: 100%;
    height: auto;
    padding: 0 0 0 0;
    text-align: center;
    font-size: 37px;
    color: #292929;
    font-weight: 400;
    margin-top: 20px;
`;
export const UserManageDiv = styled.div`
  margin-top:10px;
  padding: 2rem 1rem;
  margin-bottom: 2rem;
  border-radius: 0.3rem;
  text-align:center;
  margin-bottom:auto;
`;
export const UserManageSpan = styled.span`
    font-size:20px;
`;
export const UserManageButton = styled.button`
  width: 100px;
  height: 50px;
  border: 0;
  outline: none;
  background: #baced8;
  color: #4f5a6f;
  font-family: "Malgun Gothic", "맑은 고딕", AppleSDGothicNeo-Light, sans-serif;
  font-size: 18px;
  float:right;
  margin: 1rem 1rem;
`;
//화면 styled component로 구성.
export const UserManageContainer = styled.div`
    height:1000px;
`;
export const UserManagePrevButton = styled.button`
  border-radius:20px;
  width: 200px;
  height: 50px;
  border: 0;
  outline: none;
  background: #baced8;
  color: #4f5a6f;
  font-family: "Malgun Gothic", "맑은 고딕", AppleSDGothicNeo-Light, sans-serif;
  font-size: 18px;
  margin: 0rem 1rem;
`;
export const UserManageNextButton = styled.button`
  border-radius:20px;
  width: 200px;
  height: 50px;
  border: 0;
  outline: none;
  background: #baced8;
  color: #4f5a6f;
  font-family: "Malgun Gothic", "맑은 고딕", AppleSDGothicNeo-Light, sans-serif;
  font-size: 18px;
  margin: 0rem 1rem;
`;
//회원관리 내용 설명
export const UserManageDescription = styled.div`
    max-width: 1160px;
    margin: 20px auto 0 auto;
    width: 100%;
    height: auto;
    font-size: 16px;
    color: #292929;
    margin-bottom:40px;
`;