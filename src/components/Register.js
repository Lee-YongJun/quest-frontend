//css
import "../css/input.css";
//alert창
import Swal from 'sweetalert2';
//styled컴포넌트
import styled from "styled-components";
//등록 액션
import {register} from "../actions/auth";
//react-router-dom에서 redirect이동
import {Redirect} from "react-router-dom";
//리액트 hook기능
import React, {useState, useRef} from "react";
//리덕스 useSelector: 리덕스의 state를 조회할 수 있다.
//리덕스 useDispatch: 생성한 action을 useDispatch를 통해 발생시킬 수 있다 .
import {useDispatch, useSelector} from "react-redux";
//validation 체크
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
//필수입력 유효성 체크
const required = (value) => {
    if (!value) {
        return (
            <ErrorMessage role="alert">
                필수 입력 란입니다
            </ErrorMessage>
        );
    }
};
const vemail = (value) => {
    //이메일유효성
    var reg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (!reg.test(value)) {
        return (
            <ErrorMessage role="alert">
                이메일 형식에 맞게 입력해 주세요.
            </ErrorMessage>
        );
    }
}
const vname = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <ErrorMessage role="alert">
                이름은 반드시 3~20자 사이로 입력해주세요.
            </ErrorMessage>
        );
    }
}
//아이디 유효성체크
const vusername = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <ErrorMessage role="alert">
                ID는 반드시 3~20자 사이로 입력해주세요.
            </ErrorMessage>
        );
    }
};
//비밀번호 유효성체크
const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <ErrorMessage role="alert">
                비밀번호는 반드시 6~40자 사이로 입력해주세요.
            </ErrorMessage>
        );
    }
};
//등록
const Register = () => {
    const form = useRef();
    const checkBtn = useRef();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [postCode, setPostCode] = useState("");
    const [address, setAddress] = useState("");
    const [detailAddress, setDetailAddress] = useState("");

    const [successful, setSuccessful] = useState(false);

    const {message} = useSelector(state => state.message);
    const dispatch = useDispatch();
    const onChangeName = (e) => {
        const name = e.target.value;
        setName(name);
    }
    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };
    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };
    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    }
    const onChangeDetailAddress = (e) => {
        const detailAddress = e.target.value;
        setDetailAddress(detailAddress);
    }
    const handleRegister = (e) => {
        e.preventDefault();

        setSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            const phone = document.getElementById("phone1").value + "-" + document.getElementById("phone2").value + "-" + document.getElementById("phone3").value;
            dispatch(register(username, password, name, email, phone, postCode, address, detailAddress))
                .then(() => {
                    setSuccessful(true);
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: '회원가입에 성공하셨습니다.',
                        timer: 3000,
                        showConfirmButton: true,
                        confirmButtonColor: '#a5dc86',
                        footer: 'I-ON홈페이지에 온것을 환영합니다.'
                    }).then(() => {
                        //현재페이지새로고침
                        window.location.reload();
                    })
                })
                .catch(() => {
                    setSuccessful(false);
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: '회원가입에 실패하셨습니다.',
                        showConfirmButton: true,
                        confirmButtonColor: '#F27474'
                    })
                });
        }
    };
    const searchAddress = () => {
        new window.daum.Postcode({
            oncomplete: (data) => {
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
                // 도로명 주소의 노출 규칙에 따라 주소를 조합한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                let fullRoadAddr = data.roadAddress
                // 도로명 주소 변수
                let extraRoadAddr = ''
                // 도로명 조합형 주소 변수
                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                    extraRoadAddr += data.bname
                } // 건물명이 있고, 공동주택일 경우 추가한다.
                if (data.buildingName !== '' && data.apartment === 'Y') {
                    extraRoadAddr +=
                        extraRoadAddr !== ''
                            ? ', ' + data.buildingName
                            : data.buildingName
                }
                // 도로명, 지번 조합형 주소가 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if (extraRoadAddr !== '') {
                    extraRoadAddr = ' (' + extraRoadAddr + ')'
                }
                if (fullRoadAddr !== '') {
                    fullRoadAddr += extraRoadAddr
                }
                let postCode = document.getElementsByName("postCode")
                postCode = data.zonecode
                setPostCode(postCode);
                let address = document.getElementsByName("address")
                address = fullRoadAddr
                setAddress(address);
            }
        }).open()
    }
    return (
        <RegisterDiv>
            <RegisterP>회원가입</RegisterP>
            <Form onSubmit={handleRegister} ref={form}>
                {!successful && (
                    <>
                        <FormGroup>
                            <Input
                                placeholder="이름"
                                type="text"
                                name="name"
                                onChange={onChangeName}
                                validations={[required, vname]}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input
                                placeholder="ID"
                                type="text"
                                name="username"
                                onChange={onChangeUsername}
                                validations={[required, vusername]}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Input
                                placeholder="PASSWORD"
                                type="password"
                                name="password"
                                onChange={onChangePassword}
                                validations={[required, vpassword]}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input
                                placeholder="EMAIL"
                                type="text"
                                name="email"
                                onChange={onChangeEmail}
                                validations={[required, vemail]}
                            />
                        </FormGroup>
                        <FormPhoneGroup>
                            <RegisterInput
                                placeholder="PHONE1"
                                type="text"
                                name="phone1"
                                id="phone1"
                                maxLength="3"
                            /><Mr>-</Mr>
                            <RegisterInput
                                placeholder="PHONE2"
                                type="text"
                                name="phone2"
                                id="phone2"
                                maxLength="4"
                            /><Mr>-</Mr>
                            <RegisterInput
                                placeholder="PHONE3"
                                type="text"
                                name="phone3"
                                id="phone3"
                                maxLength="4"
                            />
                        </FormPhoneGroup>
                        <FormGroup>
                            <PostCodeInput
                                placeholder="우편번호"
                                type="text"
                                name="postCode"
                                value={postCode}
                                disabled="disabled"
                            />
                            <Ml10>
                                <AddressButton type="button" onClick={searchAddress} value="주소검색"></AddressButton>
                            </Ml10>
                        </FormGroup>
                        <FormGroup>
                            <Input
                                placeholder="주소"
                                type="text"
                                name="address"
                                value={address}
                                disabled="disabled"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input
                                placeholder="상세주소"
                                type="text"
                                name="detailAddress"
                                onChange={onChangeDetailAddress}
                            />
                        </FormGroup>

                        <FormGroup>
                            <RegisterButton>Sign Up</RegisterButton>
                        </FormGroup>
                    </>
                )}
                {successful && (
                    <Redirect to="/"/>
                )}
                {message && (
                    <AlertGroup>
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>
                    </AlertGroup>
                )}
                <CheckButton style={{display: "none"}} ref={checkBtn}/>
            </Form>
        </RegisterDiv>
    );
};
const AddressButton = styled.input`
  width: 40%;
  height: 50px;
  border: 0;
  outline: none;
  border-radius: 40px;
  background: linear-gradient(to left, rgb(255, 77, 46), rgb(255, 155, 47));
  color: white;
  font-size: 1.2em;
  letter-spacing: 2px;
`
const Ml10 = styled.span`
    margin-left:10%;
`
const PostCodeInput = styled.input`
    width:50%;
`
const Mr = styled.span`
    margin-right:1%;
    margin-left:1%;
`
const RegisterInput = styled.input`
    margin-left:1%;
    width:29.7%;
`
//화면 styled component로 구성.
const RegisterP = styled.div`
  font-weight: 700;
  font-size: 2em;
  text-align:center;
  margin-top:auto;
  margin-bottom:auto;

`;
const RegisterDiv = styled.div`
  height:100%;
  width:25%;
  position: absolute;
  top: 50%;
  left: 50%;
  /*요소의 높이/너비의 반(50%)만큼 위/왼쪽으로 이동*/
  transform: translate(-50%, -50%);
  margin-top:100px;
`;
const FormGroup = styled.div`
  margin-top:1rem;
  margin-bottom:1rem;
  text-align:right;
`;
const AlertGroup = styled.div`
  margin-top:1rem;
  margin-bottom:1rem;
`;
const FormPhoneGroup = styled.div`
  margin-bottom:1rem;
`;
const RegisterButton = styled.button`
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
const ErrorMessage = styled.span`
  font-size: 12px;
  font-weight: bold;
  color: rgb(255,77,46);
  margin-left:10px;
 `;
export default Register;
