const Weather = ({ city, temperature }) => {
    return (
        <>
            <div style={{padding: '20px', border:'1px solid #ddd'}}>
                <p>{city}의 날씨</p>
                <p>온도: {temperature}°C</p>
            </div>
        </>
    );
};

export default Weather;
