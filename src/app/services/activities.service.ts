import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { Activity } from '../model/activity.model';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {
  baseUrl = "http://localhost:9090/activities"
  constructor(private http: HttpClient) { }

  activityService(): Observable<Activity[]> {
    // return this.http.get<Activity[]>(this.baseUrl)
    return this.http.get<Activity[]>('./assets/data/activity.json')
      .pipe(map(response => {
        return <Activity[]>response;
      }));
  }
}
