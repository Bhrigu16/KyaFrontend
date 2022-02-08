import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Activity, SubactivityMap } from 'src/app/model/activity.model';
import { ActivityData } from 'src/app/model/activityData.model';
import { ActivitiesService } from 'src/app/services/activities.service';
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
  subActivities: SubactivityMap[] = [];
  thresholdUnit: any;
  activity: Activity = <Activity>{};
  subActivity: SubactivityMap = <SubactivityMap>{};
  capacity: any;
  file: File = null as any;
  fileObj: any;
  error: boolean = false;
  capacityError: boolean = false;
  captchatext: any;
  userEnterCaptcha: any;
  displayDialog: boolean = false;
  captchaErrorMsg: boolean = false;
  constructor(private activityService: ActivitiesService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.activityService.activityService().subscribe((data: Activity[]) => {
      this.activities = data;
    });
  }

  activitySelected(selectedValue: Activity) {
    this.subActivities = selectedValue.subactivityMap;
    if (this.subActivities.length == 0) {
      this.thresholdUnit = selectedValue.threshold_unit;
    }
  }
  subActivitySelected(selectedValue: SubactivityMap) {
    this.thresholdUnit = selectedValue.threshold_unit;
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
    
    if(this.subActivity && this.capacity < this.subActivity.threshold_value) {
      this.capacityError = true;
    } else if(this.activity && this.capacity < this.activity.threshold_value) {
      this.capacityError = true;
    } else {
      this.capacityError = false;
      this.displayDialog = true;
      this.captchaErrorMsg = false;
      this.getCaptcha(6);
    }
  }

  checkCaptcha() {
    if (this.userEnterCaptcha == this.captchatext) {
      this.displayDialog = false;
      this.userEnterCaptcha = '';
      const activity = new ActivityData();
      activity.activity = this.activity.activity_name;
      activity.subactivity = this.subActivity?.sub_activity_name;
      activity.capacity = this.capacity;
      activity.activityId = this.activity.activityId;
      activity.subActivityId = this.subActivity.subactivityId;
      this.activityService.userActivityService(activity, this.file).subscribe(data => {
        if(data) {
          this.messageService.add({key:'submit',severity:'success', summary:'Project Activity', detail:'Project activity and KML file uploaded successfully.'});
        }
        this.activity = null as any;
        this.subActivity = null as any;
        this.thresholdUnit = 'Unit';
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
    if(this.captchaErrorMsg) {
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
