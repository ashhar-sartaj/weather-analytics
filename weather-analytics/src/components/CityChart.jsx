import { LineChart,Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { RechartsDevtools } from '@recharts/devtools';

function CityChart({duration, data}) {
    const dataToDisplay = duration === '24h' ? data.slice(0,8) : data;
    const dataForChart = dataToDisplay.map((item) => ({
        time: item.dt_txt,
        temp: item.main.temp,
        humidity: item.main.humidity,
        wind: item.wind.speed
    }))
    // console.log(duration);
    return (<>
    <div className='parent' >
            <div className='responsive-container'>
            <ResponsiveContainer width="100%" aspect={1.618} maxHeight={500}>
                <LineChart data={dataForChart} >
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey='time' tickFormatter={(value) =>{
                        //value = "2026-02-10 12:00:00"
                        const [date, time] = value.split(' ');
                        return duration === '24h' ? time.slice(0, 5) : date.slice(5);
                    }}/>

                        <YAxis yAxisId='temp' orientation='left' tickFormatter={(v) => `${v}°`} tick={{ fill: "#8884d8" }} axisLine={{ stroke: "#8884d8", strokeWidth: "2" }} />
                        <YAxis yAxisId='humidity' orientation='right' tickFormatter={(v) => `${v}%`} tick={{ fill: "#82ca9d" }} axisLine={{ stroke: "#82ca9d", strokeWidth: "2" }} />
                    <Tooltip/>
                    <Legend verticalAlign="top" height={30} />
                        <Line yAxisId='temp' type='monotone' dataKey='temp' stroke="#8884d8" strokeWidth={2} />
                        <Line yAxisId='humidity' type='monotone' dataKey='humidity' stroke="#82ca9d" strokeWidth={2}  />
                </LineChart>
            </ResponsiveContainer>
        </div>
    </div>
    </>)
}
export default CityChart;   