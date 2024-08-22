export interface ActivityMeta {
    label: string;
    fillColor: string;
}

export interface ActivityItem {
    count: string;
    label: string;
    fillColor: string;
}

export interface DayWiseActivity {
    date: string;
    items: {
        children: ActivityItem[];
    };
}

export interface TotalActivity {
    name: string;
    value: string;
}

export interface ActiveDays {
    days: number;
    isBurnOut: boolean;
    insight: string[];
}

export interface Developer {
    name: string;
    totalActivity: TotalActivity[];
    dayWiseActivity: DayWiseActivity[];
    activeDays: ActiveDays;
}

export interface AuthorWorklog {
    activityMeta: ActivityMeta[];
    rows: Developer[];
}

export interface TransformedData {
    date: string;
    [key: string]: number | string; // Allow other keys to be numbers or strings, `date` is a string
}
