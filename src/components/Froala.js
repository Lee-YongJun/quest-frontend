//styled컴포넌트
import styled from "styled-components";
//react Hooks기능 사용.
import React, {useState, useRef} from "react";
import "../../node_modules/realgrid/dist/realgrid-sky-blue.css";
import {useDispatch, useSelector} from "react-redux";
//등록 액션
import {regNotice} from "../actions/auth";
//react-router-dom에서 redirect이동
import {Redirect} from "react-router-dom";

//프로알라 js
import 'froala-editor/js/froala_editor.pkgd.min.js';

// 프로알라 css
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

//validation 체크
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import FroalaEditor from 'react-froala-wysiwyg';
import Swal from "sweetalert2";

//필수입력 유효성 체크
const required = (value) => {
    if (!value) {
        return (
            <ErrorMessage role="alert">
                필수입력란입니다.
            </ErrorMessage>
        );
    }
};
//제목 유효성체크
const vtitle = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <ErrorMessage role="alert">
                제목은 반드시 3~20자 사이로 입력해주세요.
            </ErrorMessage>

        );
    }
};

//메인페이지
const Froala = () => {
    const form = useRef();
    const checkBtn = useRef();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [successful, setSuccessful] = useState(false);

    const dispatch = useDispatch();

    const onChangeTitle = (e) => {
        const title = e.target.value;
        setTitle(title);
    };
    const onChangeContent = (e) => {
        //태그제거정규식
        // const extractTextPattern = /(<([^>]+)>)/gi;
        //값가져오기
        const contentVal = e.valueOf();
        //태그제거
        // const content = contentVal.replace(extractTextPattern,"");
        setContent(contentVal);
    };
    const {user: currentUser} = useSelector((state) => state.auth);

    const regNoticeButton = (e) => {

        e.preventDefault();

        setSuccessful(false);
        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {

            dispatch(regNotice(title, content, currentUser.username))
                .then(() => {
                    setSuccessful(true);
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: '등록에 성공하셨습니다.',
                        timer: 3000,
                        showConfirmButton: true,
                        confirmButtonColor: '#a5dc86',
                        footer: '게시판 등록에 성공하였습니다.'
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
                        title: '등록에 실패하셨습니다.',
                        showConfirmButton: true,
                        confirmButtonColor: '#F27474'
                    })
                });
        } else {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: '등록에 실패하셨습니다.',
                footer: '제목은 3~20자사이로 입력해주세요',
                showConfirmButton: true,
                confirmButtonColor: '#F27474'
            })
        }
    }
    return (
        <FroalaContainer>
            <FroalaDiv>
                <FroalaH3>게시판 등록</FroalaH3>
                <FroalaDescription>게시판의 정보를 등록해주세요.</FroalaDescription>
            </FroalaDiv>
            <Form onSubmit={regNoticeButton} ref={form}>
                {!successful && (
                    <>
                        <FroalaDiv2>
                            <FroalaSpan>작성자 :</FroalaSpan>
                            <FroalaSpan>
                                <Input type="text"
                                       name="writer"
                                       disabled="disabled"
                                       value={currentUser.username}
                                />
                            </FroalaSpan>
                        </FroalaDiv2>
                        <FroalaDiv2>
                            <div>
                                <Input type="text"
                                       name="title"
                                       onChange={onChangeTitle}
                                       validations={[required, vtitle]}
                                       placeholder="제목을 입력하여 주세요."/>
                            </div>
                        </FroalaDiv2>
                        <FroalaDiv2>
                            <FroalaDiv3>
                                <FroalaEditor
                                    tag="textarea"
                                    name="content"
                                    id="content"
                                    onModelChange={onChangeContent}
                                ></FroalaEditor>
                            </FroalaDiv3>
                        </FroalaDiv2>
                        <FroalaDiv1>
                            <FroalaButton>등록</FroalaButton>
                        </FroalaDiv1>
                    </>
                )}
                {successful && (
                    <Redirect to="/notice"/>
                )}
                <CheckButton style={{display: "none"}} ref={checkBtn}/>
            </Form>
        </FroalaContainer>
    );
};
const ErrorMessage = styled.span`
  font-size: 12px;
  line-height: 42px;
  font-weight: bold;
  color: rgb(255,77,46);
  vertical-align: middle;
  float: right;
  margin-right:10px;
 `;
//공지사항 글씨
const FroalaH3 = styled.div`
    width: 100%;
    height: auto;
    padding: 0 0 0 0;
    text-align: center;
    font-size: 37px;
    color: #292929;
    font-weight: 400;
    margin-top: 20px;
`
//공지사항 내용 설명
const FroalaDescription = styled.div`
    max-width: 1160px;
    margin: 20px auto 0 auto;
    width: 100%;
    height: auto;
    font-size: 16px;
    color: #292929;
`
//화면 styled component로 구성.
const FroalaContainer = styled.div`
    height:1000px;
`;

const FroalaDiv = styled.div`
  margin-top:10px;
  padding: 2rem 1rem;
  border-radius: 0.3rem;
  text-align:center;
  margin-bottom:auto;
`;
const FroalaDiv1 = styled.div`
  margin-top:30px;
  float:right;
`;
const FroalaDiv2 = styled.div`
  margin-top:10px;
`;
const FroalaDiv3 = styled.div`
  border:none;
`;
const FroalaSpan = styled.span`
  width:300px;
`;
const FroalaButton = styled.button`
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
export default Froala;