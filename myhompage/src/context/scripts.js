/***************************************
 컴포넌트들에서 공통으로 사용하는 기능 작성하는 js
 *****************************************/
import message from "sockjs-client/lib/transport/lib/buffered-sender";

// 기능을 나눌 때 여러 ui 태그에서 반복적으로 사용하는 기능인가?


// ================ 로딩 관련 함수 ==============
    export const renderLoading = (message = '로딩중') => {
        return(
            <div className="page-container">
                <div className="loading-container">
                    <div className="loading-spinner">
                        <p>{message}</p>
                    </div>
                </div>
            </div>
        );
    }
// 로딩 후 데이터가 존재하지 않을 경우
export const renderNoData = (message ='데이터가 없습니다.') => {
        return (
            <div className="no-data">
                <p>{message}</p>
            </div>
        )
}

// 로딩 상태 관리 래퍼 함수
// abc에 해당하는 데이터 가져오기 기능을 수행하고,
// 데이터가 무사히 들어오면 로딩 멈충
export const withLoading = async(abc, setLoading) => {
        if(setLoading) setLoading(true);

        try {
            await abc();
        } finally {
            if(setLoading) setLoading(false)
        }
}









    // 가격 포맷팅
export const formatPrice = (price) => {
    return new Intl.NumberFormat("ko-KR").format(price);
};

// 날짜 포맷팅
export const formatDate = (dateString) => {
    const d = new Date(dateString);
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
};

// 숫자 포맷
export const numberWithCommas = (num) => {
    if (num == null) return "0";
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// 빈값 체크
export const isEmpty = (value) => {
    return value === null || value === undefined || value === "";
};

// 공백 제거
export const trimText = (text) => {
    return text.trim();
};


// 카테고리 리스트
export const PRODUCT_CATEGORIES = [
    "전체",
    "전자기기",
    "의류",
    "식품",
    "도서",
    "생활용품",
    "기타"
];
