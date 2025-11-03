import {useState} from "react";
import ChildIdState from "./ChildIdState";
import ChildPwState from "./ChildPwState";



const ChildTest = (props) => {
    return(
        <div>
            <button onClick={() => {props.handler("BBB")}}>
                변경하기
            </button>
        </div>

    )
}

const ParentComponent = () => {

    // 상태 변수 선언(State, useState)
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');

    // 이벤트 : 동작, 행위
    // 이벤트 리스너 : 동작(이벤트) 감지
    // 이벤트 핸들러 : 이벤트가 감지되었을 때 수행할 함수

    /*
        이벤트핸들러         이벤트
    const idHandler     =     (e) => {
               이벤트리스너
        setId(e.target.value); // e.target.value 특정 행동이 감지된 타겟의 값을 가져오기
    }
     */
    const idHandler = (e) => {
        setId(e.target.value);
    };

    const pwHandler = (e) => {
        setPw(e.target.value);
    };

    const [test, setTest] = useState('A');

    const testTn = (str) => {
        setTest(str)
    };

    return (
        <>
            {/*
            props 이용해 이벤트 핸들러 함수를
            자식 컴포넌트에게 전달
            */}
            <ChildIdState handler={idHandler}/>
            <ChildPwState handler={pwHandler}/>
            <div className="wrapper">
                {/* ID, PW 가 입력되지 않으면 버튼 비활성화 */}
                <button disabled={id.length === 0 || pw.length === 0}>
                    Login
                </button>
            </div>
            <h2>test 값 : {test}</h2>
            <ChildTest handler={testTn}/>
        </>
    );
};

export default ParentComponent;