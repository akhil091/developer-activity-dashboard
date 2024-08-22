import React, { useEffect, useState } from 'react';
import { fetchData } from '../services/api';
import ActivityChart from './ActivityChart';
import SummaryTable from './SummaryTable';
import Filter from './Filter';
import { AuthorWorklog, Developer, ActivityMeta } from '../types';
import { extractNameFromEmail } from '../utils';

const Dashboard: React.FC = () => {
    const [data, setData] = useState<Developer[]>([]);
    const [chartData, setChartData] = useState<any[]>([]);
    const [activityMeta, setActivityMeta] = useState<ActivityMeta[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

     // Fetch data from the API when the component mounts
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

    // Format data for the chart
    const formatChartData = (developers: Developer[], activityMeta: ActivityMeta[]) => {
        const chartData: any[] = [];
        developers.forEach(developer => {
            const developerName = extractNameFromEmail(developer.name);
            developer.dayWiseActivity.forEach(day => {
                const date = new Date(day.date).toLocaleDateString();
                const activities: { [key: string]: number } = {};
                day.items.children.forEach(item => {
                    activities[item.label] = Number(item.count);
                });
                chartData.push({ developer: developerName, date, ...activities });
            });
        });
        return chartData;
    };

    // Handle activity selection in the filter
    const handleSelectActivity = (activity: string) => {
        const newSelectedActivities = selectedActivities.includes(activity)
            ? selectedActivities.filter(a => a !== activity)
            : [...selectedActivities, activity];
        setSelectedActivities(newSelectedActivities);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    // Filter chart data based on selected activities
    const filteredActivityMeta = activityMeta.filter(meta => selectedActivities.includes(meta.label));
    const filteredChartData = chartData.map(day => {
        const filteredDay: { [key: string]: any } = { developer: day.developer, date: day.date };
        selectedActivities.forEach(activity => {
            filteredDay[activity] = day[activity];
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
