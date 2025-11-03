import {useState} from "react";



const ChildPw = ({handler}) => {
    return (
        <div className="wrapper">
            <label>PW
                <input type="password" id="inputPw" onChange={handler}/>
            </label>
        </div>
    )
}





export default ChildPw;