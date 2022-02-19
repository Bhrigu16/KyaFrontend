export interface Subactivity {
    id: number;
    activity_id: number;
    name: string;
    created_on: Date;
    created_by: number;
    updated_on: Date;
    updated_by: number;
    description: string;
    is_active: boolean;
    is_deleted: boolean;
}

export interface ThresholdParameter {
    id: number;
    activity_id: number;
    subactivity_id: number;
    name: string;
    unit: number;
    val: string;
    capacity:number;
    threshold_unit: string;
    data_type: string;
    rendering_type: string;
    regex: string;
    created_on: Date;
    created_by: number;
    updated_on: Date;
    updated_by: number;
    unit_name: string;
    required: boolean;
    description: string;
    is_active: boolean;
    is_deleted: boolean;
}

export interface Activity {
    id: number;
    name: string;
    created_on: Date;
    created_by: number;
    updated_on: Date;
    updated_by: number;
    description: string;
    is_active: boolean;
    is_deleted: boolean;
}