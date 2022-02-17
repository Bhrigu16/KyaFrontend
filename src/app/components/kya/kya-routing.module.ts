import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KyaComponent } from './kya.component';

const routes: Routes = [
  {path:'', component: KyaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KYARoutingModule { }
