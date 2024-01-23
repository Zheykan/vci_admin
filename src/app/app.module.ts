import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavComponent } from './estructura/nav/nav.component';
import { FooterComponent } from './estructura/footer/footer.component';
import { ToolbarComponent } from './estructura/toolbar/toolbar.component';
import { TopbarComponent } from './estructura/topbar/topbar.component';
import { PrincipalComponent } from './modulos/principal.component';
import { DashboardComponent } from './modulos/dashboard/dashboard.component';
import { LoginComponent } from './modulos/login/login.component';
import { RegisterComponent } from './modulos/register/register.component';
import { ForgotPasswordComponent } from './modulos/forgot-password/forgot-password.component';
import { ErrorNotFoundComponent } from './modulos/error-not-found/error-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    ToolbarComponent,
    TopbarComponent,
    PrincipalComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ErrorNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
