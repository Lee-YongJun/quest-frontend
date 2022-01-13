//화면 css적용하는데 react styled-components사용.
import styled from "styled-components";
//react Hooks기능 사용.
import React, {useEffect} from "react";
//권한별 페이지 서비스
import AuthService from "../services/authService";
import RealGrid from "realgrid";
//리얼그리드 css
import "../../node_modules/realgrid/dist/realgrid-sky-blue.css";
import Swal from "sweetalert2";
import {deleteUser, modify, register} from "../actions/auth";
import {useDispatch} from "react-redux";

//전역선언
let gridView, container, provider;
let page = -1;
let totalPage = -1;

//관리자페이지
const UserManage = () => {
    //상태값 초기화
    const dispatch = useDispatch();

    useEffect(() => {

        container = document.getElementById("realgrid");
        provider = new RealGrid.LocalDataProvider(true);
        gridView = new RealGrid.GridView(container);
        //인디케이터 출력
        gridView.setRowIndicator({
            visible: true
        });
        //체크바 출력
        gridView.setCheckBar({
            visible: false
        });

        //헤더높이 지정
        gridView.header.heights = 52;
        //행의 높이 지정
        gridView.displayOptions.rowHeight = 52;

        gridView.displayOptions.emptyMessage = "표시할 데이타가 없습니다.";

        gridView.footer.height = 40;
        gridView.displayOptions.fitStyle = "fill";
        gridView.setEditOptions({
            insertable: true,
            appendable: true,
            deletable: true,
            editable: true,
            updatable: true
        });

        gridView.setRowStyleCallback(function (grid, item, fixed) {
            switch (item.rowState) {
                case "created":
                    return "lightskyblue-color";
                case "updated":
                    return "lightcyan-color";
                default:
                    return "";
            }
        })

        gridView.setDataSource(provider);

        // 필드 생성
        provider.setFields([
            {
                fieldName: "id",
                dataType: "NUMBER",
            },
            {
                fieldName: "username",
                dataType: "TEXT",
            },
            {
                fieldName: "password",
                dataType: "TEXT",
            },
            {
                fieldName: "name",
                dataType: "TEXT",
            },
            {
                fieldName: "createdAt",
                dataType: "DATETIME",
            },
            {
                fieldName: "updatedAt",
                dataType: "DATETIME",
            },
            {
                fieldName: "address",
                dataType: "TEXT",
            },
            {
                fieldName: "detailAddress",
                dataType: "TEXT",
            },
            {
                fieldName: "email",
                dataType: "TEXT",
            },
            {
                fieldName: "phone",
                dataType: "TEXT",
            },
            {
                fieldName: "postCode",
                dataType: "TEXT",
            },
        ]);

        // 컬럼 생성
        gridView.setColumns([
            {
                name: "id",
                fieldName: "id",
                type: "data",
                header: {
                    text: "번호",
                },
            },
            {
                name: "username",
                fieldName: "username",
                type: "data",
                header: {
                    text: "ID",
                },
                placeHolder: "이름을 입력하세요.",
            },
            {
                name: "password",
                fieldName: "password",
                type: "data",
                header: {
                    text: "PASSWORD",
                },
                placeHolder: "비밀번호를 입력하세요.",
            },
            {
                name: "name",
                fieldName: "name",
                type: "data",
                popupMenu: "menu1",
                header: {
                    text: "이름",
                },
                placeHolder: "이름을 입력하세요.",
            },
            {
                name: "email",
                fieldName: "email",
                type: "data",
                header: {
                    text: "이메일",
                },
                placeHolder: "이메일을 입력하세요.",
            },
            {
                name: "phone",
                fieldName: "phone",
                type: "data",
                header: {
                    text: "전화번호",
                },
                placeHolder: "전화번호를 입력하세요.",
                "editor": {
                    "mask": {
                        "editMask": "000-0000-0000"
                    }
                },
                "textFormat": "([0-9]{3})([0-9]{4})([0-9]{4});$1-$2-$3"
            },
            {
                name: "postCode",
                fieldName: "postCode",
                type: "data",
                header: {
                    text: "우편번호",
                },
                placeHolder: "우편번호를 입력하세요.",
            },
            {
                name: "address",
                fieldName: "address",
                type: "data",
                header: {
                    text: "주소",
                },
                placeHolder: "주소를 입력하세요.",
                renderer: {
                    type: "link",
                    urlCallback: function (grid, cell) {
                        return "https://www.google.com/maps/place/" + cell.value;
                    },
                },
                footer: {
                    text: "총 회원수  :",
                },
            },
            {
                name: "detailAddress",
                fieldName: "detailAddress",
                type: "data",
                header: {
                    text: "상세주소",
                },
                placeHolder: "상세주소를 입력하세요.",
                footer: {
                    numberFormat: "#,##0",
                    valueCallback: function (grid, column, footerIndex, columnFooter, value) {
                        var count = grid.getSummary("id", "count");
                        return count;
                    }
                },
            },
            {
                name: "createdAt",
                fieldName: "createdAt",
                type: "data",
                header: {
                    text: "등록일",
                },
            },
            {
                name: "updatedAt",
                fieldName: "updatedAt",
                type: "data",
                header: {
                    text: "수정일",
                },
            }
        ]);
        var menu = [
            {
                label: "삭제여부",
                enabled: true,
                children: [
                    {
                        label: "yes"
                    },
                    {
                        label: "no"
                    }
                ]
            },
            {
                label: "엑셀출력"
            }
        ];

        gridView.addPopupMenu("menu1", menu);
        gridView.setColumnProperty("username", "popupMenu", "menu1");
        gridView.setColumnProperty("username", "button", "popup");

        gridView.onMenuItemClicked = function (grid, data, index) {

            var current = gridView.getCurrent();
            var id = provider.getValue(current.dataRow, 'id');

            if (data.label === "yes") {
                dispatch(deleteUser(id))
                    .then(() => {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: '삭제에 성공하셨습니다.',
                            timer: 3000,
                            showConfirmButton: true,
                            confirmButtonColor: '#a5dc86',
                            footer: '회원삭제에 성공하였습니다.'
                        }).then(() => {
                            window.location.reload();
                        })
                    })
                    .catch(() => {
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: '회원삭제에 실패 하셨습니다.',
                            showConfirmButton: true,
                            footer: '회원관리페이지로 이동합니다.',
                            confirmButtonColor: '#F27474'
                        })
                    });
                gridView.deleteSelection(true);
            } else if (data.label === "no") {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: '회원삭제를 누르지 않았습니다.',
                    showConfirmButton: true,
                    footer: '회원관리페이지로 이동합니다.',
                    confirmButtonColor: '#F27474'
                })
            } else if (data.label === "엑셀출력") {
                grid.exportGrid({
                    type: "excel",
                    target: "local"
                });
            }
        };

        var curr = gridView.getCurrent();

        gridView.beginUpdateRow(curr.itemIndex);
        gridView.showEditor();
        gridView.setFocus();
        gridView.columnByName("id").editable = false;
        gridView.columnByName("username").editable = false;
        gridView.columnByName("createdAt").editable = false;
        gridView.columnByName("updatedAt").editable = false;
        gridView.columnByName("password").visible = false;
        gridView.columnByName("id").visible = false;

        provider.onRowUpdating = function (provider, row) {

            var item = gridView.getEditingItem(); // 현재 편집 중인 행 정보와 값을 가져옵니다.
            //이메일유효성
            var reg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

            if (item) {
                if (!reg.test(item.values["email"])) {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: '이메일형식에 맞지 않습니다.',
                        showConfirmButton: true,
                        confirmButtonColor: '#F27474'
                    })
                    return false;
                }
            }
            return true;
        };
        //업데이트
        provider.onRowUpdated = function (provider, row) {
            const r = provider.getJsonRow(row);
            dispatch(modify(r))
                .then(() => {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: '수정에 성공하셨습니다.',
                        timer: 3000,
                        showConfirmButton: true,
                        confirmButtonColor: '#a5dc86',
                        footer: '회원수정에 성공하였습니다.'
                    }).then(() => {

                    })
                })
                .catch(() => {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: '회원수정에 실패하셨습니다.',
                        showConfirmButton: true,
                        confirmButtonColor: '#F27474'
                    })
                });
        };

        AuthService.getUserList().then(
            (response) => {

                provider.fillJsonData(response.data.data, {fillMode: "set"});

                gridView.setPaging(true, 10);

                page = gridView.getPage();
                totalPage = gridView.getPageCount();

                document.getElementById("current-page-view").innerHTML = page + 1;
                document.getElementById("total-page-view").innerHTML = totalPage;

                gridView.onPageChanged = function (grid, page) {
                    document.getElementById("current-page-view").innerHTML = page + 1;
                };

                gridView.onPageCountChanged = function (grid, totalPage) {
                    document.getElementById("total-page-view").innerHTML = totalPage;
                };
            },
        );
    }, [dispatch]);
    const userAdd = () => {
        gridView.columnByName("username").editable = true;
        gridView.columnByName("password").visible = true;
        gridView.columnByName("createdAt").visible = false;
        gridView.columnByName("updatedAt").visible = false;
        //추가
        gridView.beginInsertRow(Math.max(0, gridView.getCurrent().itemIndex), true);

        gridView.beginAppendRow();
        gridView.showEditor();
        gridView.setFocus();

        provider.onRowInserting = function (provider, row) {

            var item = gridView.getEditingItem(); // 현재 편집 중인 행 정보와 값을 가져옵니다.
            //이메일유효성
            var reg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

            if (item) {
                if (!reg.test(item.values["email"])) {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: '이메일형식에 맞지 않습니다.',
                        showConfirmButton: true,
                        confirmButtonColor: '#F27474'
                    })
                    return false;
                }
                if (item.values["username"].length < 3 || item.values["username"].length > 20) {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: '아이디는 3~20자 사이로 만들어주세요.',
                        showConfirmButton: true,
                        confirmButtonColor: '#F27474'
                    })
                    return false;
                }
                if (item.values["password"].length < 6 || item.values["password"].length > 20) {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: '비밀번호는 6~20자 사이로 만들어주세요.',
                        showConfirmButton: true,
                        confirmButtonColor: '#F27474'
                    })
                    return false;
                }
            }
            return true;
        };
        //추가
        provider.onRowInserted = function (provider, row) {
            const r = provider.getJsonRow(row);
            dispatch(register(r.username, r.password, r.name, r.email, r.phone, r.postCode, r.address, r.detailAddress))
        };
    }
    const setPrevPage = () => {
        let currentPage = gridView.getPage();
        gridView.setPage(currentPage - 1);
    };

    const setNextPage = () => {
        let currentPage = gridView.getPage();
        gridView.setPage(currentPage + 1);
    }
    return (
        <NoticeContainer>
            <NoticeDiv>
                <NoticeH3>회원관리 </NoticeH3>
                <NoticeDescription>아이온커뮤니케이션즈의 회원 정보를 안내해 드립니다.</NoticeDescription>

                <div id="realgrid"></div>
                <NoticeButton onClick={userAdd}>
                    추가
                </NoticeButton>
                <Toolbar>
                    <NoticePrevButton onClick={setPrevPage}>
                        이전페이지
                    </NoticePrevButton>
                    <NoticeSpan id="current-page-view"></NoticeSpan>
                    /
                    <NoticeSpan id="total-page-view"></NoticeSpan>
                    <NoticeNextButton onClick={setNextPage}>
                        다음페이지
                    </NoticeNextButton>
                </Toolbar>

            </NoticeDiv>

        </NoticeContainer>
    );
};
//화면 styled component로 구성.
const Toolbar = styled.div`
    margin-top:6rem;
`
const NoticeSpan = styled.span`
    font-size:20px;
`
const NoticeButton = styled.button`
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
const NoticePrevButton = styled.button`
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
const NoticeNextButton = styled.button`
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

//공지사항 글씨
const NoticeH3 = styled.div`
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
const NoticeDescription = styled.div`
    max-width: 1160px;
    margin: 20px auto 0 auto;
    width: 100%;
    height: auto;
    font-size: 16px;
    color: #292929;
    margin-bottom:40px;
`
//화면 styled component로 구성.
const NoticeContainer = styled.div`
    height:1000px;
`;

const NoticeDiv = styled.div`
  margin-top:10px;
  padding: 2rem 1rem;
  margin-bottom: 2rem;
  border-radius: 0.3rem;
  text-align:center;
  margin-bottom:auto;
`;
export default UserManage;
