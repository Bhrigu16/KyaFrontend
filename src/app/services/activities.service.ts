import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { Activity } from '../model/activity.model';
import { ActivityData } from '../model/activityData.model';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {
  baseUrl = "http://localhost:9090/kya/"
  constructor(private http: HttpClient) { }

  activityService(): Observable<Activity[]> {
    // return this.http.get<Activity[]>(this.baseUrl)
    return this.http.get<Activity[]>('./assets/data/activity.json')
      .pipe(map(response => {
        return <Activity[]>response;
      }));
  }

  userActivityService(activity: ActivityData, file: File) {
    const form: FormData = new FormData();
    form.append('json',JSON.stringify(activity));
    form.append('file', file);
    return this.http.post(this.baseUrl + 'userActivity', form);
  }
}
