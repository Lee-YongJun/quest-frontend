//styled컴포넌트
import {
    ErrorMessage,
    FroalaH3,
    FroalaDescription,
    FroalaContainer,
    FroalaDiv,
    FroalaDiv1,
    FroalaDiv2,
    FroalaDiv3,
    FroalaSpan,
    FroalaButton
} from "../styles/styledFroala";
//alert
import Swal from "sweetalert2";
//react-router-dom에서 redirect이동
import {Redirect} from "react-router-dom";
//등록 액션
import {regNotice} from "../actions/auth";
//react Hooks기능 사용.
import React, {useState, useRef} from "react";
//리덕스
import {useDispatch, useSelector} from "react-redux";
//리얼그리드 css
import "../../node_modules/realgrid/dist/realgrid-sky-blue.css";
//Froala
import FroalaEditor from 'react-froala-wysiwyg';
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
//validation 체크
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

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
        //값가져오기
        const contentVal = e.valueOf();
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
export default Froala;