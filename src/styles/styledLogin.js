//화면 styled component로 구성.
import styled from "styled-components";

export const LoginP = styled.div`
  font-weight: 700;
  font-size: 2em;
  text-align:center;
`;
export const LoginDiv = styled.div`
  width:25%;
  position: absolute;
  top: 50%;
  left: 50%;
  /*요소의 높이/너비의 반(50%)만큼 위/왼쪽으로 이동*/
  transform: translate(-50%, -50%)
}
`;
export const FormGroup = styled.div`
  margin-top:1rem;
  margin-bottom:1rem;
`;
export const LoginButton = styled.button`
  width: 100%;
  height: 50px;
  border: 0;
  outline: none;
  border-radius: 40px;
  background: linear-gradient(to left, rgb(255, 77, 46), rgb(255, 155, 47));
  color: white;
  font-size: 1.2em;
  letter-spacing: 2px;
`;
export const ErrorMessage = styled.span`
  font-size: 12px;
  line-height: 42px;
  font-weight: bold;
  color: rgb(255,77,46);
  vertical-align: middle;
  float: right;
  margin-right:10px;
 `;