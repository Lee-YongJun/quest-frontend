import styled from "styled-components";

export const Mr = styled.span`
    margin-right:1%;
    margin-left:1%;
`;
export const Ml10 = styled.span`
    margin-left:10%;
`;
//화면 styled component로 구성.
export const RegisterP = styled.div`
  font-weight: 700;
  font-size: 2em;
  text-align:center;
  margin-top:auto;
  margin-bottom:auto;
`;
export const FormGroup = styled.div`
  margin-top:1rem;
  margin-bottom:1rem;
  text-align:right;
`;
export const AlertGroup = styled.div`
  margin-top:1rem;
  margin-bottom:1rem;
`;
export const RegisterDiv = styled.div`
  height:100%;
  width:25%;
  position: absolute;
  top: 50%;
  left: 50%;
  /*요소의 높이/너비의 반(50%)만큼 위/왼쪽으로 이동*/
  transform: translate(-50%, -50%);
  margin-top:100px;
`;
export const ErrorMessage = styled.span`
  font-size: 12px;
  font-weight: bold;
  color: rgb(255,77,46);
  margin-left:10px;
 `;
export const PostCodeInput = styled.input`
    width:50%;
`;
export const RegisterInput = styled.input`
    margin-left:1%;
    width:29.7%;
`;
export const AddressButton = styled.input`
  width: 40%;
  height: 50px;
  border: 0;
  outline: none;
  border-radius: 40px;
  background: linear-gradient(to left, rgb(255, 77, 46), rgb(255, 155, 47));
  color: white;
  font-size: 1.2em;
  letter-spacing: 2px;
`;
export const FormPhoneGroup = styled.div`
  margin-bottom:1rem;
`;
export const RegisterButton = styled.button`
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