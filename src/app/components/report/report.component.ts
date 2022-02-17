import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivitiesService } from 'src/app/services/activities.service';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit,AfterViewInit {
  @ViewChild('body', {static:true}) private body!: ElementRef;
  reportData: any
  constructor(private activityService: ActivitiesService) { }

  ngOnInit(): void {
    this.activityService.getReport().subscribe(data => {
      this.reportData = data;
      })
  }

  ngAfterViewInit(): void {
      this.generatePdf()
  }

  generatePdf() {
    let DATA:HTMLElement = this.body.nativeElement;
    html2canvas(DATA,{useCORS:true,logging:true}).then(
      function (canvas:any) {
        var pageData = canvas.toDataURL('image/jpg', 1.0);
        //Default vertical direction, size ponits, format a4[595.28,841.89]
        var pdf = new jsPDF('p', 'pt', 'a4');
        //Two parameters after addImage control the size of the added image, where the page height is compressed according to the width-height ratio column of a4 paper.
        pdf.addImage(pageData, 'JPEG', 0, 0, 595.28, 592.28 / canvas.width * canvas.height);
        pdf.save('report.pdf');
      })
  }

}
