export interface Activity {
    activity_name: string;
    subactivityMap: SubactivityMap[];
    threshold_parameter: string;
    threshold_unit: string;
    threshold_value: number;
}

export interface SubactivityMap {
    sub_activity_name: string;
    threshold_value: number;
}