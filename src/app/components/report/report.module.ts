import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { CheckboxModule } from 'primeng/checkbox';
import { ReportRoutingModule } from './report-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ReportComponent],
  imports: [
    CommonModule,
    MatExpansionModule,
    CheckboxModule,
    FormsModule,
    ReportRoutingModule
  ],
  exports: [ReportComponent]
})
export class ReportModule { }
