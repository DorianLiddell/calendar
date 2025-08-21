export interface DateInfo {
    month: number;
    year: number;
    selectedDate: string;
}

export interface LocaleData {
    monthNames: string[];
    weekdays: string[];
}

export interface Day {
    day: string | number;
    date: string;
}