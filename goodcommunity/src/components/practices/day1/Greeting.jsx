function Greeting(props) {
    return (
        <>
            <div style={{padding: '20px', border:'1px solid #ddd'}}>

                <h2>{props.message}</h2>
            </div>
        </>
    );
}

export default Greeting;
