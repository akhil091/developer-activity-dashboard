import React from 'react';

interface FilterProps {
    activities: string[];
    selectedActivities: string[];
    onSelectActivity: (activity: string) => void;
}

const Filter: React.FC<FilterProps> = ({ activities, selectedActivities, onSelectActivity }) => {
    return (
        <div className="filter">
            {activities.map(activity => (
                <div key={activity} className="filter-item">
                    <input
                        type="checkbox"
                        id={activity}
                        checked={selectedActivities.includes(activity)}
                        onChange={() => onSelectActivity(activity)}
                    />
                    <label htmlFor={activity}>{activity}</label>
                </div>
            ))}
        </div>
    );
};

export default Filter;
