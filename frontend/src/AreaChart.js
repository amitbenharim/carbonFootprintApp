import React from 'react'
import { AreaChart, XAxis, YAxis, CartesianGrid, Area, Tooltip} from 'recharts';

const PeriodChart = ({data, colors, name}) => {
    const keys = Object.keys(data[0]).filter(i => i !== "name")
    const area_data = data
    console.log(area_data)
    return (
    <AreaChart width={400} height={200} data={area_data}
    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
    <defs>
    {keys.map((category, index) => 
        <linearGradient id={name+"Color" + category} x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor={colors[index]} stopOpacity={0.8}/>
        <stop offset="95%" stopColor={colors[index]} stopOpacity={0}/>
        </linearGradient>)}
    </defs>
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <CartesianGrid strokeDasharray="3 3" />
    {keys.map((category, index) => 
        <Area type="monotone" dataKey={category} stroke={colors[index]} stackId="1" fillOpacity={1} fill={"url(#" + name +"Color" + category + ")"} />)}
    </AreaChart>)
}

export {PeriodChart}