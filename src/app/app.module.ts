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
import { ClientComponent } from './modulos/client/client.component';
import { DevolutionComponent } from './modulos/devolution/devolution.component';
import { ErrorNotFoundComponent } from './modulos/error-not-found/error-not-found.component';
import { ForgotPasswordComponent } from './modulos/forgot-password/forgot-password.component';
import { LoginComponent } from './modulos/login/login.component';
import { ProductComponent } from './modulos/product/product.component';
import { ProviderComponent } from './modulos/provider/provider.component';
import { PurchaseComponent } from './modulos/purchase/purchase.component';
import { RegisterComponent } from './modulos/register/register.component';
import { SaleComponent } from './modulos/sale/sale.component';
import { UserComponent } from './modulos/user/user.component';
import { RegisterProductComponent } from './modulos/register-product/register-product.component';
import { CityComponent } from './modulos/city/city.component';
import { MarkComponent } from './modulos/mark/mark.component';
import { UnityComponent } from './modulos/unity/unity.component';
import { ErrorhComponent } from './modulos/errorh/errorh.component';
import { RegisterClientComponent } from './modulos/register-client/register-client.component';
import { RegisterDevolutionComponent } from './modulos/register-devolution/register-devolution.component';
import { RegisterProvideerComponent } from './modulos/register-provideer/register-provideer.component';
import { RegisterPurchaseComponent } from './modulos/register-purchase/register-purchase.component';
import { RegisterSaleComponent } from './modulos/register-sale/register-sale.component';
import { ReportGeneralComponent } from './modulos/report-general/report-general.component';
import { ReportPurchaseComponent } from './modulos/report-purchase/report-purchase.component';
import { ReportSaleComponent } from './modulos/report-sale/report-sale.component';
import { DepartmentComponent } from './modulos/department/department.component';
import { HelpComponent } from './modulos/help/help.component';





@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    ToolbarComponent,
    TopbarComponent,
    PrincipalComponent,
    DashboardComponent,
    ClientComponent,
    DevolutionComponent,
    ErrorNotFoundComponent,
    ForgotPasswordComponent,
    LoginComponent,
    ProductComponent,
    ProviderComponent,
    PurchaseComponent,
    RegisterComponent,
    SaleComponent,
    UserComponent,
    RegisterProductComponent,
    CityComponent,
    MarkComponent,
    UnityComponent,
    ErrorhComponent,
    RegisterClientComponent,
    RegisterDevolutionComponent,
    RegisterProvideerComponent,
    RegisterPurchaseComponent,
    RegisterSaleComponent,
    ReportGeneralComponent,
    ReportPurchaseComponent,
    ReportSaleComponent,
    DepartmentComponent,
    HelpComponent
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
