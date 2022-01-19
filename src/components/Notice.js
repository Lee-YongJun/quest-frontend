//styled컴포넌트
import {
    Toolbar,
    NoticeSpan,
    NoticeButton,
    NoticePrevButton,
    NoticeNextButton,
    NoticeH3,
    NoticeDescription,
    NoticeContainer,
    NoticeDiv
} from "../styles/styledNotice";
//react Hooks기능 사용.
import React, {useEffect} from "react";
//권한별 페이지 서비스
import UserService from "../services/noticeService";
//리얼그리드
import RealGrid from 'realgrid';
import "../../node_modules/realgrid/dist/realgrid-sky-blue.css";
import {useSelector} from "react-redux";
// Froala
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

//전역선언
let gridView, container, provider;
let page = -1;
let totalPage = -1;

//유저페이지
const Notice = () => {
    //상태값초기화
    const {user: currentUser} = useSelector((state) => state.auth);
    useEffect(() => {

        container = document.getElementById("realgrid");
        provider = new RealGrid.LocalDataProvider(true);
        gridView = new RealGrid.GridView(container);

        //푸터
        gridView.footer.visible = false;
        //인디케이터 출력
        gridView.setRowIndicator({
            visible: false
        });
        //상태바 출력
        gridView.setStateBar({
            visible: false
        });
        //체크바 출력
        gridView.setCheckBar({
            visible: false
        });
        //헤더높이 지정
        gridView.header.heights = 52;
        //행의 높이 지정
        gridView.displayOptions.rowHeight = 52;

        gridView.setDataSource(provider);
        gridView.displayOptions.fitStyle = "fill";
        // 필드 생성
        provider.setFields([
            {
                fieldName: "id",
                dataType: "NUMBER",
            },
            {
                fieldName: "title",
                dataType: "TEXT",
            },
            {
                fieldName: "writer",
                dataType: "TEXT",
            },
            {
                fieldName: "createdAt",
                dataType: "DATETIME",
            },
        ]);

        // 컬럼 생성
        gridView.setColumns([
            {
                name: "id",
                fieldName: "id",
                type: "data",
                header: {
                    text: "글번호",
                },
            },
            {
                name: "title",
                fieldName: "title",
                type: "data",
                header: {
                    text: "제목",
                },
            },
            {
                name: "writer",
                fieldName: "writer",
                type: "data",
                header: {
                    text: "작성자",
                },
            },
            {
                name: "createdAt",
                fieldName: "createdAt",
                type: "data",
                header: {
                    text: "작성일",
                },
            },
        ]);

        UserService.getNoticePage().then(
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
    }, []);
    const froala = () => {
        document.location.replace('/froala');
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
                <NoticeH3>공지사항 </NoticeH3>
                <NoticeDescription>아이온커뮤니케이션즈의 최신 정보를 안내해 드립니다.</NoticeDescription>
                <div id="realgrid"></div>
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
            {currentUser &&
                <NoticeButton onClick={froala}>글쓰기</NoticeButton>
            }
        </NoticeContainer>
    );
};
export default Notice;
