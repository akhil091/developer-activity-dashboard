import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { TransformedData, ActivityMeta } from '../types';

interface ActivityChartProps {
    data: TransformedData[];
    activityMeta: ActivityMeta[];
}

const getColorForActivity = (label: string, activityMeta: ActivityMeta[]): string => {
    const activity = activityMeta.find(meta => meta.label === label);
    return activity ? activity.fillColor : '#000'; // Default color if not found
};

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
                    <Line
                        key={index}
                        type="monotone"
                        dataKey={meta.label} // Use label as dataKey
                        stroke={getColorForActivity(meta.label, activityMeta)}
                        strokeWidth={2}
                        dot={false} // To remove dots
                    />
                ))}
            </LineChart>
        </ResponsiveContainer>
    );
};

export default ActivityChart;
