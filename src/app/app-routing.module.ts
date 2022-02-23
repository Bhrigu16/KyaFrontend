import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/kya', pathMatch: 'full' },
  { path: 'kya', loadChildren: () => import('src/app/components/kya/kya.module').then(m => m.KyaModule) },
  { path: 'report', loadChildren: () => import('src/app/components/report/report.module').then(m => m.ReportModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
