import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { Activity, Subactivity, ThresholdParameter } from '../model/activity.model';
import { ActivityData } from '../model/activityData.model';
import { baseUrl, baseUrlGis } from '../shared/app-constant';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {
  constructor(private http: HttpClient) { }

  activityService(): Observable<Activity[]> {
    return this.http.get<Activity[]>(baseUrl+'getactivities')
    // return this.http.get<Activity[]>('./assets/data/activity.json')
      .pipe(map(response => {
        return <Activity[]>response;
      }));
  }

  subActivityService(activityid:number): Observable<Subactivity[]> {
    const params = new HttpParams().set('id',activityid);
    return this.http.get<Subactivity[]>(baseUrl+'getSubactivity',{params:params});
  }

  thresholdParameterService(id:number,type:string): Observable<ThresholdParameter[]> {
    const params = new HttpParams().set('id',id);
    if(type == 'activity') {
      return this.http.get<ThresholdParameter[]>(baseUrl+'getActivityThreshold',{params:params});
    } else {
      return this.http.get<ThresholdParameter[]>(baseUrl+'getSubActivityThreshold',{params:params});
    }
  }

  fileValidation(file:File) {
    const form: FormData = new FormData();
    
    form.append('file', file);
    return this.http.post(baseUrl+'getFileValidation',form);
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
