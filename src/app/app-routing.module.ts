import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/kya', pathMatch: 'full' },
  { path: '**', redirectTo: '/kya', pathMatch: 'full' },
  { path: 'kya', loadChildren: () => import('src/app/components/kya/kya.module').then(m => m.KyaModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
