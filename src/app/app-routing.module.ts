import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './modulos/login/login.component';
import { PrincipalComponent } from './modulos/principal.component';
import { DashboardComponent } from './modulos/dashboard/dashboard.component';
import { RegisterComponent } from './modulos/register/register.component';
import { ForgotPasswordComponent } from './modulos/forgot-password/forgot-password.component';
import { ErrorNotFoundComponent } from './modulos/error-not-found/error-not-found.component';

const routes: Routes = [
  {
    path: '', component: PrincipalComponent,
      children:[
        { path: 'dashboard', component: DashboardComponent },
        { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      ]
  },
  { 
    path: 'login', component: LoginComponent 
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'forgot-password', component: ForgotPasswordComponent
  },
  {
    path:'**', component: ErrorNotFoundComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
