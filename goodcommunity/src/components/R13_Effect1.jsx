import {useEffect, useState} from "react";

const Effect1 = () => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        // 1. 실행하고 싶은 일 (명령서 내용)
        // 예 : 서버에서 데이터를 가져와라
        // 페이지 제목을 내 사이트로 바꿔라
        // 과 같은 기능
    }, [
        // 2. 실행할 조건(언제?)
        // 빈 배열 형태
        // 빈 배열 형태의 경우
        // 처음 화면에 필요한 데이터를 서버에서 가져올 때
        // 처음 한번만 설정해야하는 이벤트(스크롤 감지) 등록할 때
        // 빈 배열이 없을 경우 무한 루프 실행하기 때문에 프로그램 멈출 수 있으므로
        // 배열은 표기해두는 것이 옮음
        ]);

    useEffect(() => {
        document.title = `당신은 ${count}번 클릭했습니다.`
    });
    return (
        <div>
            <p>당신은 {count}번 클릭했습니다.</p>
            <button onClick={() => setCount(count + 1)}>클릭하세요!</button>
        </div>
    );
};

export default Effect1;