import styled from "styled-components";

//공지사항 글씨
export const FroalaH3 = styled.div`
     width: 100%;
     height: auto;
     padding: 0 0 0 0;
     text-align: center;
     font-size: 37px;
     color: #292929;
     font-weight: 400;
     margin-top: 20px;
`
export const FroalaDiv = styled.div`
     margin-top:10px;
     padding: 2rem 1rem;
     border-radius: 0.3rem;
     text-align:center;
     margin-bottom:auto;
`;
export const FroalaDiv1 = styled.div`
     margin-top:30px;
     float:right;
`;
export const FroalaDiv2 = styled.div`
     margin-top:10px;
`;
export const FroalaDiv3 = styled.div`
     border:none;
`;
export const FroalaSpan = styled.span`
     width:300px;
`;
export const FroalaButton = styled.button`
     height: 50px;
     width:100px;
     border: 0;
     outline: none;
     border-radius: 10px;
     background: linear-gradient(to left, rgb(255, 77, 46), rgb(255, 155, 47));
     color: white;
     font-size: 1.2em;
     letter-spacing: 2px;
`;
//에러메세지
export const ErrorMessage = styled.span`
     font-size: 12px;
     line-height: 42px;
     font-weight: bold;
     color: rgb(255,77,46);
     vertical-align: middle;
     float: right;
     margin-right:10px;
 `;
//화면 styled component로 구성.
export const FroalaContainer = styled.div`
     height:1000px;
`;
//공지사항 내용 설명
export const FroalaDescription = styled.div`
     max-width: 1160px;
     margin: 20px auto 0 auto;
     width: 100%;
     height: auto;
     font-size: 16px;
     color: #292929;
`;