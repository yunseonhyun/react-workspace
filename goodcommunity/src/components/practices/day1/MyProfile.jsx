const MyProfile = (props) => {
    return (
        <>
            <div style={{padding: '20px', border:'1px solid #ddd'}}>
                <h2>자기소개</h2>
                <p>이름 : {props.name}</p>
                <p>나이 : {props.age}</p>
                <p>학교 : {props.school}</p>
            </div>
        </>
    );
};

export default MyProfile;