export class ActivityData {
    activityId: number;
    subActivityId: number;
    activity: string;
    subactivity: string;
    capacity: number;

    constructor() {
        this.activityId = 0;
        this.subActivityId = 0;
        this.activity = '';
        this.subactivity = '';
        this.capacity = 0;
    }
}