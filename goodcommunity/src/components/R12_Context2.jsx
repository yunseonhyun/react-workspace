import {createContext} from "react";


/* 1. Context 객체 생성 -> prop 없이 상태값이나 데이터 사용 가능
* 중간다리 역할하는 js나 jsx를 건너 뛰고 필요한 js or jsx에서
* 나 부모에서 만들어놓은 상태나 데이터 사용하겠어! 라는
* useContext(Context 명칭)을 component 내부에 선언하면
* 어디서든 사용 가능한 hook
*  */
const TestContext = createContext()


const GrandChild =() => {

}

const Child =() => {

}

const Parent = () => {
    return (
        <>

        </>
    );
};

export default Parent.jsx;