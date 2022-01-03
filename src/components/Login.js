//reactHooks
import React, {useState, useRef} from "react";
//리덕스 useSelector: connect함수를 이용하지 않고 리덕스의 state를 조회할 수 있다.
//리덕스 useDispatch:생성한 action을 useDispatch를 통해 발생시킬 수 있다 .
import {useDispatch, useSelector} from "react-redux";
//router redirect링크 처리
import {Redirect} from 'react-router-dom';
//validation처리
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
//css연결
import "../css/input.css";
import {login} from "../actions/auth";
//스타일 컴포넌트
import styled from "styled-components";
//alert창 변경
import Swal from 'sweetalert2'

//필수입력 유효성 처리
const required = (value) => {
    if (!value) {
        return (
            <ErrorMessage role="alert">
                필수 입력 란입니다
            </ErrorMessage>
        );
    }
};
//로그인
const Login = (props) => {
    //특정DOM을 가리킬때 사용하는 Hook함수
    const form = useRef();
    const checkBtn = useRef();

    //state 초기값 설정.
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    //리덕스 상태값 조회
    const {isLoggedIn} = useSelector(state => state.auth);
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

    const handleLogin = (e) => {
        e.preventDefault();

        setLoading(true);

        form.current.validateAll();
        
        if (checkBtn.current.context._errors.length === 0) {
            dispatch(login(username, password))
                .then(() => {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: '로그인에 성공하셨습니다.',
                        timer: 3000,
                        showConfirmButton: true,
                        confirmButtonColor: '#a5dc86',
                        footer: 'I-ON홈페이지에 온것을 환영합니다.'
                    }).then(() => {
                         props.history.push("/profile");
                         //현재페이지새로고침
                         window.location.reload();
                    })
                })
                .catch(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    };

    if (isLoggedIn) {
        return <Redirect to="/profile"/>;
    }

    return (
        <LoginDiv>
            <LoginP>로그인</LoginP>
            <Form onSubmit={handleLogin} ref={form}>
                <FormGroup>
                    <Input
                        placeholder="ID"
                        type="text"
                        name="username"
                        value={username}
                        onChange={onChangeUsername}
                        validations={[required]}
                    />
                </FormGroup>

                <FormGroup>
                    <Input
                        placeholder="PASSWORD"
                        type="password"
                        name="password"
                        value={password}
                        onChange={onChangePassword}
                        validations={[required]}
                    />
                </FormGroup>

                <FormGroup>
                    <LoginButton disabled={loading}>
                        {loading && (
                            <span className="spinner-border spinner-border-sm"></span>
                        )}
                        <span>Login</span>
                    </LoginButton>
                </FormGroup>

                {message && (
                    <FormGroup>
                        <ErrorMessage role="alert">
                            아이디와 비밀번호를 확인해주세요.
                        </ErrorMessage>
                    </FormGroup>
                )}
                <CheckButton style={{display: "none"}} ref={checkBtn}/>
            </Form>
        </LoginDiv>
    );
};
const LoginP = styled.div`
  font-weight: 700;
  font-size: 2em;
  text-align:center;
`;
const LoginDiv = styled.div`
  width:25%;
  position: absolute;
  top: 50%;
  left: 50%;
  /*요소의 높이/너비의 반(50%)만큼 위/왼쪽으로 이동*/
  transform: translate(-50%, -50%)
}
`;
const FormGroup = styled.div`
  margin-top:1rem;
  margin-bottom:1rem;
`;
const LoginButton = styled.button`
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
export default Login;
