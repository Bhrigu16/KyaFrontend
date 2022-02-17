import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { Activity } from '../model/activity.model';
import { ActivityData } from '../model/activityData.model';
import { baseUrlGis } from '../shared/app-constant';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {
  baseUrl = "http://localhost:9090/kya/"
  constructor(private http: HttpClient) { }

  activityService(): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.baseUrl+'getactivities')
    // return this.http.get<Activity[]>('./assets/data/activity.json')
      .pipe(map(response => {
        return <Activity[]>response;
      }));
  }

  userActivityService(activity: ActivityData, file: File) {
    const form: FormData = new FormData();
    
    form.append('file', file);

    const params = new HttpParams()
    .set('kmlType',"KYA")
    .set('mappingId', 121);

    
    return this.http.post(baseUrlGis,form,{params:params});
  }

  getReport() {
    return this.http.get('./assets/data/report.json');
  }
}
