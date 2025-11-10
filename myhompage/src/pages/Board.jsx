// 전체 게시판
// 1. const Board = () => () -> {} 형태로 변경
// 2. useEffect 이용해서 8085/api/board/all 데이터 가져오기
// axios.get 이용
// const [boards, setBoards] = useState([]);
// boards 에 백엔드에서 가져온 데이터 데이터 추가
import "../boards.css";
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Board = () => {
    const navigate = useNavigate();
    const [boards, setBoards] = useState([]);
         useEffect(() => {
            axios.get("http://localhost:8085/api/board/all")
                .then(res => {
                    console.log("boards : ", boards);
                    // res.data 백엔드에서 가져온 데이터를
                    // boards에 넣어주기 전이므로, 데이터가 0인 상태가 맞음
                    console.log("백엔드에서 가져온데이터 : ", res.data);
                    console.log(setBoards("백엔드에서 가져온 데이터를 boards에 저장 : ", res.data));
                    setBoards(res.data); // boards 변수이름에 데이터 저장기능 실행
            })
                .catch(e => {
                alert("백엔드에서 데이터를 가져올때 문제 발생")
            })

    }, []);

         const handleIDClick = (id) => {
             navigate(`/board/${id}`);
         }

    return (
        <div className="page-container">
            <div className="board-header">
                <h1>게시판</h1>
                <button className="button">
                    글쓰기
                </button>
            </div>

            <div className="board-info">
                <p>전체 게시물: 개</p>
            </div>

            <table className="board-table">
                <thead>
                <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>조회수</th>
                    <th>작성일</th>
                </tr>
                </thead>
                <tbody>
                    {/*
                    1. 제목 클릭해도 게시물이 들어가도록
                    2. error 해결
                    */}


                    {boards
                        .map((b) => (
                        <tr key={b.id}>
                            <td onClick={() => handleIDClick(b.id)}>{b.id}</td>
                            <td onClick={() => handleIDClick(b.id)}>{b.title}</td>
                            <td>{b.writer}</td>
                            <td>{b.viewCount}</td>
                            <td>{b.createdAt}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    );
};

export default Board;



