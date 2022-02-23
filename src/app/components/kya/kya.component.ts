import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
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
  activity: Activity = <Activity>{};
  subActivity: Subactivity = <Subactivity>{};
  file: File = null as any;
  fileObj: any;
  isEmptyCapacity:boolean=false;
  isCapacityNumeral:boolean=false;
  error: boolean = false;
  capacityError: boolean = false;
  captchatext: any;
  subActivityError: boolean = false;
  IsKeyPress:boolean=false;
  userEnterCaptcha: any;
  displayDialog: boolean = false;
  captchaErrorMsg: boolean = false;
  constructor(private activityService: ActivitiesService, private messageService: MessageService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.activityService.activityService().subscribe((data: Activity[]) => {
      this.activities = data;
    });
  }

  activitySelected(selectedValue: Activity) {
    this.activity = selectedValue;
    this.IsKeyPress = false;
    this.spinner.show()
    this.activityService.subActivityService(selectedValue.id).subscribe((subactivity: Subactivity[]) => {
      this.subActivities = subactivity;
      if (this.subActivities.length == 0) {
        this.spinner.show()
        this.activityService.thresholdParameterService(selectedValue.id, 'activity').subscribe((thresholdParameters: ThresholdParameter[]) => {
          this.thresholdUnit = thresholdParameters;
          this.spinner.hide()
        });
      } else {
        this.spinner.hide()
        this.thresholdUnit = [];
        this.subActivity = <Subactivity>{}

        //this.subActivities = [];
      }
    })
  }
  subActivitySelected(selectedValue: Subactivity) {
    this.subActivity = selectedValue;
    this.subActivityError = false;
    this.IsKeyPress = false;
    this.spinner.show()
    this.activityService.thresholdParameterService(selectedValue.id, 'subactivity').subscribe((thresholdParameters: ThresholdParameter[]) => {
      this.thresholdUnit = thresholdParameters;
      this.spinner.hide()
    });
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
      this.activityService.fileValidation(this.file).subscribe(flag => {
        if(flag) {
          this.error = false
        } else {
          this.error = true;
        }
      })
      this.error = false;
    }
    console.log(this.file.type);
  }

  isCapacityEmpty(val: any) {

    if (!val) {
      return true; //capacity is empty
    }
    if (val?.toString().length == 0) {
      return true;
    }
    else { return false }
  }

  isCapacityNegative(val: any) {
    let isTrue: boolean = false;
    let regex = /^-/; //Static regex
    if (!val?.toString().match(regex)) {
      isTrue = true;

    } else {
      isTrue = false;

    }


    return isTrue;
  }
  isCapacityNumeric(val: any) {
    let isTrue: boolean = false;
    let numbers = /^[0-9]+$/; //Static regex
    if (this.isCapacityEmpty(val)) {
      return false;
    }

    if (val?.toString().match(numbers)) {
      isTrue = true;

    } else {
      isTrue = false;

    }


    return isTrue;
  }


  checkErrorThresholdCapacity(capacity: any) {
    this.IsKeyPress = true;
    this.isEmptyCapacity = this.isCapacityEmpty(capacity.value);
    this.isCapacityNumeral = this.isCapacityNumeric(capacity.value);


  }



  ErrorThresholdCapacity() {
    let isTrue: Boolean = false;

    let numbers = /^[0-9]+$/; //Static regex

    //in case regex is coming from DB use below code

    //let regExDB=this.thresholdUnit[i].regex

    //for(let i =0;i<this.thresholdUnit.length;i++){

    //   if(this.thresholdUnit[i].capacity.toString().match(regExDB)){

    //     isTrue=true;



    //   }else{

    //     isTrue=false;

    //     break;

    //   }



    // }

    if(this.thresholdUnit.length !=0) {

     

      for (let i = 0; i < this.thresholdUnit.length; i++) {

        if (this.thresholdUnit[i].capacity?.toString().match(numbers)) {

          isTrue = true;

        } else {

          isTrue = false;

          break;

        }

      }

} else {

  isTrue = true;

}
    return isTrue;
  }

  checkForm() {
    if ((this.activity || this.subActivity) && (this.file != null && !this.error)) {
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
    if(this.subActivities && this.subActivities.length > 0 && Object.keys(this.subActivity).length==0) {
      this.subActivityError = true;
    } else {
      this.subActivityError = false;
    }
    if (!this.ErrorThresholdCapacity()) {
      this.displayDialog = false
      this.capacityError = true;
      this.IsKeyPress = true;

    } else {
      this.displayDialog = true;
      this.capacityError = false;
      this.IsKeyPress = false;
      this.captchaErrorMsg = false;
      this.getCaptcha(6);
    }
  }

  checkCaptcha() {
    if (this.userEnterCaptcha == this.captchatext) {
      this.displayDialog = false;
      this.userEnterCaptcha = '';
      const activity = new ActivityData();
      activity.activity = this.activity.name;
      activity.subactivity = this.subActivity?.name;
      activity.capacity = this.thresholdUnit[0]?.capacity;
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
          "&capacity=" + this.thresholdUnit[0]?.capacity +
          "&kmlId=" + data.id +
          "&projectTypeName=" + this.activity.name +
          "&projectSubtypeName=" + this.subActivity.name +
          "&capacityUnit=" + this.thresholdUnit[0]?.threshold_unit;

        //http://localhost/pariveshdss/Sourav10_02Integration/gis-map.html?projectType=3&projectSubtype=1&capacity=40&kmlId=17

        this.activity = null as any;
        this.subActivity = null as any;
        this.thresholdUnit = [];
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
