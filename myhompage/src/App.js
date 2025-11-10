import logo from './logo.svg';
import {Link, NavLink, Route, Routes} from "react-router-dom";
import './App.css';
import Main from './pages/Main';
import Board from './pages/Board';
import Signup from './pages/Signup';
import Login from './pages/Login';
import MyPage from './pages/MyPage';
import Write from './pages/Write';

import './App.css';
import BoardDetail from "./pages/BoardDetail";
function App() {

    return (
        <div className="App">
            {/* --- 5. 공통 내비게이션 바 --- */}
            <nav className="navbar">
                <Link to="/" className="logo">myhomepage</Link>
                <div className="nav-links">
                    <NavLink to="/">메인</NavLink>
                    <NavLink to="/board">게시판</NavLink>
                    <NavLink to="/write">글쓰기</NavLink>
                    <NavLink to="/login">로그인</NavLink>
                </div>

            </nav>

            {/* --- 6. 페이지가 렌더링될 영역 --- */}
            <Routes>
                <Route path="/" element={<Main/>} />
                <Route path="/board" element={<Board/>} />
                <Route path="/board/:id" element={<BoardDetail/>} />
                <Route path="/signup" element={<Signup/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/mypage" element={<MyPage/>} />
                <Route path="/write" element={<Write/>} />
            </Routes>

        {/* 공통 푸터 - 모든 페이지에 보이는 footer 작성 */}
            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>myhomepage</h3>
                        <p>&copy; 2025 All rights reserved.</p>
                    </div>
                    {/*
                    React에서는 a태그 대신 Link 태그를 사용하지만
                    Link 태그는 웹 페이지에서 a태그로 변환됨
                    css 적용할 때는 Link라는 태그 대신에 a태그에 css 적용
                    Link 태그 내부에 a태그 속성이 존재함
                    a 태그의 경우 html이나 외부 링크 주소로 이동하는 속성을 지니고 있기 때문에
                    이 속성을 리액트에 맞추어 변화시켜 Link 태그 형태로 사용하는 것
                    <div className="footer-section">
                        <h4>링크</h4>
                        <Link to="/">메인</Link>
                        <Link to="/board">게시판</Link>
                        <Link to="/write">글쓰기</Link>
                    </div>

                    .footer-section a { // 메인 게시판 글쓰기에 적용되는 스타일시트
                        display: block;
                        color: #bdc3c7;
                        text-decoration: none;
                        margin: 5px 0;
                        transition: color 0.3s;
                    }
                    .footer-section a:hover {
                        color: #3498db;
                    }

                    */}
                    <div className="footer-section">
                        <h4>링크</h4>
                        <Link to="/">메인</Link>
                        <Link to="/board">게시판</Link>
                        <Link to="/write">글쓰기</Link>
                    </div>
                    <div className="footer-section">
                        <h4>문의</h4>
                        <p>Email : contact@myhompage.com</p>
                        <p>Tel : 02-1234-5678</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;

