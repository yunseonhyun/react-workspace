import React, { useState } from 'react';

const LikeButton = () => {
    // 여기에 코드 작성
    // 1. useState로 좋아요 수 상태 만들기 (초기값: 0)
    // 2. 증가 함수 만들기
    // 3. 초기화 함수 만들기
    const [like, setLike] = useState(0);
    const plusLike = () => {setLike(like + 1)};
    const reset = () => {setLike(0)};


    return (
        <div>
            <h3>좋아요 : {like}</h3>
            {/* 하트 버튼 */}
            <button onClick={plusLike}>
                ❤
            </button>
            {/* 10 이상이면 메시지 표시 */}
            {like >= 10 && (
                <div>
                    인기게시물입니다.
                </div>
            )}

            {/* 초기화 버튼 */}
            <button onClick={reset}>
                초기화
            </button>
        </div>
    );
}

export default LikeButton;