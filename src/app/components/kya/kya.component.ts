import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Activity, Subactivity, ThresholdParameter } from 'src/app/model/activity.model';
import { ActivityData } from 'src/app/model/activityData.model';
import { ActivitiesService } from 'src/app/services/activities.service';
import { hrefLink } from 'src/app/shared/app-constant';
@Component({
  selector: 'app-kya',
  templateUrl: './kya.component.html',
  styleUrls: ['./kya.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class KyaComponent implements OnInit {
  @ViewChild('myCanvas')
  myCanvas!: ElementRef<HTMLCanvasElement>;
  activities: Activity[] = [];
  subActivities: Subactivity[] = [];
  thresholdUnit: ThresholdParameter[] = [];
  unit: ThresholdParameter = <ThresholdParameter>{};
  activity: Activity = <Activity>{};
  subActivity: Subactivity = <Subactivity>{};
  capacity: any;
  file: File = null as any;
  fileObj: any;
  error: boolean = false;
  capacityError: boolean = false;
  captchatext: any;
  userEnterCaptcha: any;
  displayDialog: boolean = false;
  captchaErrorMsg: boolean = false;
  constructor(private activityService: ActivitiesService, private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
    this.activityService.activityService().subscribe((data: Activity[]) => {
      this.activities = data;
    });
  }

  activitySelected(selectedValue: Activity) {
    this.subActivities = selectedValue.subactivity;
    if (this.subActivities.length == 0) {
      if (selectedValue.thresholdParameter.length >= 1) {
        this.thresholdUnit = selectedValue.thresholdParameter;
        this.unit = this.thresholdUnit[0];
      } else {
        this.thresholdUnit = [];
        this.unit = <ThresholdParameter>{};
        this.unit.threshold_unit = 'Unit';
      }
    } else {
      this.thresholdUnit = [];
      this.unit = <ThresholdParameter>{};
      this.unit.threshold_unit = 'Unit';
    }
  }
  subActivitySelected(selectedValue: Subactivity) {
    this.thresholdUnit = selectedValue.thresholdParameter;
    this.unit = this.thresholdUnit[0];
  }

  thresholdUnitSelected(selectedValue: ThresholdParameter) {
    this.unit = selectedValue;
  }

  onFileChoose(event: any) {
    if (event instanceof FileList) {
      this.file = event[0];
      this.fileObj = { name: this.file.name, size: this.bytesToSize(this.file.size) };
    } else {
      this.file = event.target.files[0];
      this.fileObj = { name: this.file.name, size: this.bytesToSize(this.file.size) };
    }
    if (this.file.name.split('.').pop() != 'kml') {
      this.error = true;
    } else {
      this.error = false;
    }
    console.log(this.fileObj);
  }

  checkForm() {
    if (((this.activity && this.capacity) || this.subActivity) && (this.file != null && !this.error)) {
      return false;
    } else {
      return true;
    }
  }

  removeFile() {
    this.file = null as any;
    this.fileObj = null;
  }

  bytesToSize(bytes: any) {
    const units = ['bytes', 'K', 'M', 'G', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let l = 0, n = parseInt(bytes, 10) || 0;
    while (n >= 1024 && ++l) {
      n = n / 1024;
    }
    return (n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
  }

  uploadKml() {

    // if(this.subActivity && this.capacity < this.subActivity.threshold_value) {
    //   this.capacityError = true;
    // } else if(this.activity && this.capacity < this.activity.threshold_value) {
    //   this.capacityError = true;
    // } else {
    //   this.capacityError = false;
    // }
    this.displayDialog = true;
    this.captchaErrorMsg = false;
    this.getCaptcha(6);
  }

  checkCaptcha() {
    if (this.userEnterCaptcha == this.captchatext) {
      this.displayDialog = false;
      this.userEnterCaptcha = '';
      const activity = new ActivityData();
      activity.activity = this.activity.name;
      activity.subactivity = this.subActivity?.name;
      activity.capacity = this.capacity;
      activity.activityId = this.activity.id;
      activity.subActivityId = this.subActivity.id;
      this.activityService.userActivityService(activity, this.file).subscribe((data: any) => {
        if (data) {
          this.messageService.add({ key: 'submit', severity: 'success', summary: 'Project Activity', detail: 'Project activity and KML file uploaded successfully.' });
        }


        /*
        const params = new HttpParams()
        .set('projectType',this.activity.activityId)
        .set('projectSubtype', this.subActivity.subactivityId)
        .set('capacity',this.capacity)
        .set('kmlId',data.id);
        */

        //http://localhost:8080/examples/Sourav10_02Integration/gis-map.html?projectType=3&projectSubtype=1&capacity=40&kmlId=1
        window.location.href = hrefLink + "?projectType=" + this.activity.id +
          "&projectSubtype=" + this.subActivity.id +
          "&capacity=" + this.capacity +
          "&kmlId=" + data.id +
          "&projectTypeName=" + this.activity.name +
          "&projectSubtypeName=" + this.subActivity.name +
          "&capacityUnit=" + this.unit.threshold_unit;

        //http://localhost/pariveshdss/Sourav10_02Integration/gis-map.html?projectType=3&projectSubtype=1&capacity=40&kmlId=17

        this.activity = null as any;
        this.subActivity = null as any;
        this.unit = <ThresholdParameter>{};
        this.unit.threshold_unit = 'Unit';
        this.capacity = null;
        this.subActivities = [];
        this.file = null as any;
        this.fileObj = undefined
        console.log(data);

      });
    } else {
      this.getCaptcha(6);
      this.captchaErrorMsg = true;
      this.userEnterCaptcha = ''
    }
  }

  resetError() {
    if (this.captchaErrorMsg) {
      this.captchaErrorMsg = false;
    }
  }

  getCaptcha(length: any) {
    var pen: any = this.myCanvas.nativeElement.getContext('2d');
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    this.captchatext = '';
    for (var i = 0; i < length; i++) {
      this.captchatext += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    pen.font = "20px Georgia";
    pen.fillStyle = "white";
    pen?.fillRect(0, 0, 400, 400);
    pen.fillStyle = "black";
    pen?.fillText(this.captchatext, 40, 40);
    console.log(this.captchatext);
    // return result;
  }

}
