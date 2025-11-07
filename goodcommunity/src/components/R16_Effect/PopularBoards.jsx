import {useEffect, useState} from "react";
import axios from "axios";
const PopularBoards = () => {
    const API_BASE_URL = "http://localhost:8080";
    const [popBoards, setPopBoards] = useState([]);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/api/board/popular`)
            .then(res => {
                setPopBoards(res.data)
                console.log(res.data)

            })
            .catch(err=> {
                alert("데이터를 가져오는 중 문제가 발생했습니다.")
            })
    }, []);

    return (
        <>
            <h2>인기 게시물</h2>
            <ul>
                {popBoards.map(p => (
                    <li>
                        <strong>{p.title} ({p.createdAt})</strong>
                        조회수 : {p.viewCount}
                    </li>
                ))}
            </ul>
        </>
    );
};

export default PopularBoards;