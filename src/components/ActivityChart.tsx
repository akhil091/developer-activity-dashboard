import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { ActivityMeta } from '../types';

interface ActivityChartProps {
    data: any[];
    activityMeta: ActivityMeta[];
}

// This component renders the activity chart with data and metadata passed as props.
const ActivityChart: React.FC<ActivityChartProps> = ({ data, activityMeta }) => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                {activityMeta.map((meta, index) => (
                    <Line key={index} type="monotone" dataKey={meta.label} stroke={meta.fillColor} strokeWidth={2} />
                ))}
            </LineChart>
        </ResponsiveContainer>
    );
};

export default ActivityChart;
