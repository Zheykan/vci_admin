import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './modulos/login/login.component';
import { PrincipalComponent } from './modulos/principal.component';
import { DashboardComponent } from './modulos/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '', component: PrincipalComponent,
      children:[
        { path: 'dashboard', component: DashboardComponent },
        { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      ]
  },
  { path: 'login', component: LoginComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
