export interface Subactivity {
    id: number;
    thresholdParameter: ThresholdParameter[];
    activity_id: number;
    name: string;
    created_on: Date;
    created_by: number;
    updated_on: Date;
    updated_by: number;
    description?: any;
    _deleted: boolean;
    _active: boolean;
}

export interface ThresholdParameter {
    id: number;
    activity_id: number;
    subactivity_id: number;
    name: string;
    unit: number;
    val: string;
    threshold_unit: string;
    data_type: string;
    rendering_type: string;
    regex?: any;
    created_on: Date;
    created_by: number;
    updated_on: Date;
    updated_by: number;
    description?: any;
    _deleted: boolean;
    _active: boolean;
}

export interface Activity {
    id: number;
    subactivity: Subactivity[];
    thresholdParameter: ThresholdParameter[];
    name: string;
    created_on: Date;
    created_by: number;
    updated_on: Date;
    updated_by: number;
    description?: any;
    _deleted: boolean;
    _active: boolean;
}