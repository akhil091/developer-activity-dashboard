export interface ActivityMeta {
    label: string;
    fillColor: string;
}

export interface TotalActivity {
    name: string;
    value: string;
}

export interface DayWiseItem {
    count: string;
    label: string;
    fillColor: string;
}

export interface DayWiseActivity {
    date: string;
    items: {
        children: DayWiseItem[];
    };
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
