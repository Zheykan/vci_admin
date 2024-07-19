import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { accessUserGuard } from './guard/access-user.guard';
import { PrincipalComponent } from './modulos/principal.component';
import { DashboardComponent } from './modulos/dashboard/dashboard.component';
import { CityComponent } from './modulos/city/city.component';
import { ClientComponent } from './modulos/client/client.component';
import { DepartmentComponent } from './modulos/department/department.component';
import { DevolutionComponent } from './modulos/devolution/devolution.component';
import { ErrorhComponent } from './modulos/errorh/errorh.component';
import { ErrorNotFoundComponent } from './modulos/error-not-found/error-not-found.component';
import { ForgotPasswordComponent } from './modulos/forgot-password/forgot-password.component';
import { HelpComponent } from './modulos/help/help.component';
import { LoginComponent } from './modulos/login/login.component';
import { MarkComponent } from './modulos/mark/mark.component';
import { ProductComponent } from './modulos/product/product.component';
import { ProviderComponent } from './modulos/provider/provider.component';
import { PurchaseComponent } from './modulos/purchase/purchase.component';
import { RegisterComponent } from './modulos/register/register.component';
import { SaleComponent } from './modulos/sale/sale.component';
import { UserComponent } from './modulos/user/user.component';
import { RegisterProductComponent } from './modulos/register-product/register-product.component';
import { RegisterClientComponent } from './modulos/register-client/register-client.component';
import { RegisterDevolutionComponent } from './modulos/register-devolution/register-devolution.component';
import { RegisterProvideerComponent } from './modulos/register-provideer/register-provideer.component';
import { RegisterPurchaseComponent } from './modulos/register-purchase/register-purchase.component';
import { RegisterSaleComponent } from './modulos/register-sale/register-sale.component';
import { ReportGeneralComponent } from './modulos/report-general/report-general.component';
import { ReportPurchaseComponent } from './modulos/report-purchase/report-purchase.component';
import { ReportSaleComponent } from './modulos/report-sale/report-sale.component';
import { UnityComponent } from './modulos/unity/unity.component';

const routes: Routes = [
  {
    // La protección de acceso protegido por el guard redirige al inicio de sesion en toda ventana nueva no duplicada
    path: '', component: PrincipalComponent, canActivate: [accessUserGuard],
      children:[
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        { path: 'dashboard', component: DashboardComponent },
        { path: 'city', component: CityComponent },
        { path: 'client', component: ClientComponent },
        { path: 'department', component: DepartmentComponent },
        { path: 'devolution', component: DevolutionComponent },
        { path: 'mark', component: MarkComponent },
        { path: 'product', component: ProductComponent },
        { path: 'provider', component: ProviderComponent },
        { path: 'purchase', component: PurchaseComponent },
        { path: 'register-client', component: RegisterClientComponent },
        { path: 'register-devolution', component: RegisterDevolutionComponent },
        { path: 'register-product', component: RegisterProductComponent },
        { path: 'register-provider', component: RegisterProvideerComponent },
        { path: 'register-purchase', component: RegisterPurchaseComponent },
        { path: 'register-sale', component: RegisterSaleComponent },
        { path: 'report-general', component: ReportGeneralComponent },
        { path: 'report-purchase', component: ReportPurchaseComponent },
        { path: 'report-sale', component: ReportSaleComponent },
        { path: 'sale', component: SaleComponent },
        { path: 'unity', component: UnityComponent },
        { path: 'user', component: UserComponent },
      ]
  },
  {
    path: 'error-history', component: ErrorhComponent, canActivate: [accessUserGuard]
  },
  {
    path: 'forgot-password', component: ForgotPasswordComponent
  },
  {
    path: 'help', component: HelpComponent, canActivate: [accessUserGuard]
  },
  { 
    path: 'login', component: LoginComponent 
  },
  {
    path: 'register', component: RegisterComponent, canActivate: [accessUserGuard]
  },
  {
    path:'**', component: ErrorNotFoundComponent, canActivate: [accessUserGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
