import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KyaComponent } from './kya.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { KYARoutingModule } from './kya-routing.module';
import { FormsModule } from '@angular/forms';
import { DragNDropDirective } from './drag-ndrop.directive';
import { ActivitiesService } from 'src/app/services/activities.service';
import { MessageService } from 'primeng/api';


@NgModule({
  declarations: [KyaComponent, DragNDropDirective],
  imports: [
    CommonModule,
    KYARoutingModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    MessageModule,
    DialogModule,
    ToastModule,
    FormsModule
  ],
  providers: [ActivitiesService, MessageService],
  exports: [KyaComponent]
})
export class KyaModule { }
