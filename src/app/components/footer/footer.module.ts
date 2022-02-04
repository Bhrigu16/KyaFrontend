import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule
  ],
  exports: [FooterComponent]
})
export class FooterModule { }
