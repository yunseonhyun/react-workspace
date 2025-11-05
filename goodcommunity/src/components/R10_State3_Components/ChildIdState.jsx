import {useState} from "react";

const styles = {
    wrapper: {
        padding: '1rem',
        backgroundColor: '#f0fdf4',
        borderRadius: '8px',
        marginBottom: '1rem'
    },
    label: {
        displat: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        color: '#15803d',
        fontWeight: '600',
        fontSize: '0.95rem'
    },
    input:{
        padding: '0.6rem 0.8rem',
        border: '2px solid #86efac',
        borderRadius: '6px',
        outline: 'none',
        fontSize: '1rem'
    }
}

const ChildIdState = (props) => {
    const {handler} = props; // const handler = props.handler;

    console.log(handler); // handler 확인
    return(
        <div style={styles.wrapper}>
            <label style={styles.label}
                   htmlFor="inputId">
                ID
            <input style={styles.input}
                   type="text"
                   id="inputId"
                   onChange={handler}/>

            </label>
        </div>
    )
}


export default ChildIdState;