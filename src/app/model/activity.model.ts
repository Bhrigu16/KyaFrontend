export interface Activity {
    activityId: number;
    activity_name: string;
    subactivityMap: SubactivityMap[];
    threshold_parameter: string;
    threshold_unit: string;
    threshold_value: number;
}

export interface SubactivityMap {
    subactivityId: number;
    sub_activity_name: string;
    threshold_value: number;
    threshold_unit: string;
}