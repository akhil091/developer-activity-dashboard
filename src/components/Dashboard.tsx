import React, { useEffect, useState } from 'react';
import { fetchData } from '../services/api';
import ActivityChart from './ActivityChart';
import SummaryTable from './SummaryTable';
import Filter from './Filter';
import { AuthorWorklog, Developer, ActivityMeta, TransformedData } from '../types';

const Dashboard: React.FC = () => {
    const [data, setData] = useState<Developer[]>([]);
    const [chartData, setChartData] = useState<TransformedData[]>([]);
    const [activityMeta, setActivityMeta] = useState<ActivityMeta[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const result: AuthorWorklog = await fetchData();
                const developers = result.rows;
                setActivityMeta(result.activityMeta);
                setData(developers);
                const formattedChartData = formatChartData(developers, result.activityMeta);
                setChartData(formattedChartData);
                setSelectedActivities(result.activityMeta.map(meta => meta.label));
            } catch (error) {
                setError("Error fetching data");
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, []);

    const formatChartData = (developers: Developer[], activityMeta: ActivityMeta[]): TransformedData[] => {
        const dates = Array.from(new Set(developers.flatMap(dev => dev.dayWiseActivity.map(day => day.date))));

        return dates.map(date => {
            const entry: TransformedData = { date };
            developers.forEach(dev => {
                const day = dev.dayWiseActivity.find(d => d.date === date);
                if (day) {
                    day.items.children.forEach(item => {
                        entry[`${dev.name}_${item.label}`] = Number(item.count) || 0;
                    });
                }
            });
            return entry;
        });
    };

    const handleSelectActivity = (activity: string) => {
        const newSelectedActivities = selectedActivities.includes(activity)
            ? selectedActivities.filter(a => a !== activity)
            : [...selectedActivities, activity];
        setSelectedActivities(newSelectedActivities);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const filteredActivityMeta = activityMeta.filter(meta => selectedActivities.includes(meta.label));
    const filteredChartData = chartData.map(day => {
        const filteredDay: TransformedData = { date: day.date };
        selectedActivities.forEach(activity => {
            filteredDay[activity] = day[`${activity}`] || 0;
        });
        return filteredDay;
    });

    return (
        <div className="container">
            <h1>Developer Activity Dashboard</h1>
            <div className="filter-container">
                <Filter
                    activities={activityMeta.map(meta => meta.label)}
                    selectedActivities={selectedActivities}
                    onSelectActivity={handleSelectActivity}
                />
            </div>
            <div className="chart-container">
                <ActivityChart data={filteredChartData} activityMeta={filteredActivityMeta} />
            </div>
            <div className="table-container">
                <SummaryTable data={data} />
            </div>
        </div>
    );
};

export default Dashboard;
