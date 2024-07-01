import React from 'react';
import { Developer } from '../types';
import { extractNameFromEmail } from '../utils';

interface SummaryTableProps {
    data: Developer[];
}

const SummaryTable: React.FC<SummaryTableProps> = ({ data }) => {
    return (
        <table className="summary-table">
            <thead>
                <tr>
                    <th>Developer</th>
                    {data[0]?.totalActivity.map((activity, index) => (
                        <th key={index}>{activity.name}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((developer, index) => (
                    <tr key={index}>
                        <td>{extractNameFromEmail(developer.name)}</td>
                        {developer.totalActivity.map((activity, index) => (
                            <td key={index}>{activity.value}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default SummaryTable;
