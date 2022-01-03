import React, {useState, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";

// import { useHistory } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import "../css/input.css";
import {register} from "../actions/auth";
import styled from "styled-components";
import {Redirect} from "react-router-dom";
import Swal from 'sweetalert2'


const required = (value) => {
    if (!value) {
        return (
            <ErrorMessage role="alert">
                필수 입력 란입니다
            </ErrorMessage>
        );
    }
};

const vusername = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <ErrorMessage role="alert">
                ID는 반드시 3~20자 사이로 입력해주세요.
            </ErrorMessage>
        );
    }
};

const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <ErrorMessage role="alert">
                비밀번호는 반드시 6~40자 사이로 입력해주세요.
            </ErrorMessage>
        );
    }
};

const Register = () => {
    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);

    const {message} = useSelector(state => state.message);
    const dispatch = useDispatch();

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };
    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };
    // const history = useHistory();
    const handleRegister = (e) => {
        e.preventDefault();

        setSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            dispatch(register(username, password))
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
                    })
                })
                .catch(() => {
                    console.log(message);
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
    return (
        <RegisterDiv>
            <RegisterP>회원가입</RegisterP>
            <Form onSubmit={handleRegister} ref={form}>
                {!successful && (
                    <>
                        <FormGroup>
                            <Input
                                placeholder="ID"
                                type="text"
                                name="username"
                                value={username}
                                onChange={onChangeUsername}
                                validations={[required, vusername]}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Input
                                placeholder="PASSWORD"
                                type="password"
                                name="password"
                                value={password}
                                onChange={onChangePassword}
                                validations={[required, vpassword]}
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
                    <FormGroup>
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>
                    </FormGroup>
                )}
                <CheckButton style={{display: "none"}} ref={checkBtn}/>
            </Form>
        </RegisterDiv>
    );
};
const RegisterP = styled.div`
  font-weight: 700;
  font-size: 2em;
  text-align:center;
  margin-top:auto;
  margin-bottom:auto;
`;
const RegisterDiv = styled.div`
  width:25%;
  position: absolute;
  top: 50%;
  left: 50%;
  /*요소의 높이/너비의 반(50%)만큼 위/왼쪽으로 이동*/
  transform: translate(-50%, -50%);
`;
const FormGroup = styled.div`
  margin-top:1rem;
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
  line-height: 42px;
  font-weight: bold;
  color: rgb(255,77,46);
  vertical-align: middle;
  float: right;
  margin-right:10px;
 `;
export default Register;
