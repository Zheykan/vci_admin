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
import { RegisterProvideerComponent } from './modulos/register-provideer/register-provideer.component';
import { RegisterPurchaseComponent } from './modulos/register-purchase/register-purchase.component';
import { RegisterSaleComponent } from './modulos/register-sale/register-sale.component';
import { UnityComponent } from './modulos/unity/unity.component';

const routes: Routes = [
  {
    path: '', component: PrincipalComponent,
      children:[
        { path: '', redirectTo: '/login', pathMatch: 'full' },
        { path: 'dashboard', component: DashboardComponent, canActivate: [accessUserGuard] },
        { path: 'city', component: CityComponent, canActivate: [accessUserGuard] },
        { path: 'client', component: ClientComponent, canActivate: [accessUserGuard] },
        { path: 'department', component: DepartmentComponent, canActivate: [accessUserGuard] },
        { path: 'devolution', component: DevolutionComponent, canActivate: [accessUserGuard] },
        { path: 'mark', component: MarkComponent, canActivate: [accessUserGuard] },
        { path: 'product', component: ProductComponent, canActivate: [accessUserGuard] },
        { path: 'provider', component: ProviderComponent, canActivate: [accessUserGuard] },
        { path: 'purchase', component: PurchaseComponent, canActivate: [accessUserGuard] },
        { path: 'register-client', component: RegisterClientComponent, canActivate: [accessUserGuard] },
        { path: 'register-product', component: RegisterProductComponent, canActivate: [accessUserGuard] },
        { path: 'register-provider', component: RegisterProvideerComponent, canActivate: [accessUserGuard] },
        { path: 'register-purchase', component: RegisterPurchaseComponent, canActivate: [accessUserGuard] },
        { path: 'register-sale', component: RegisterSaleComponent, canActivate: [accessUserGuard] },
        { path: 'sale', component: SaleComponent, canActivate: [accessUserGuard] },
        { path: 'unity', component: UnityComponent, canActivate: [accessUserGuard] },
        { path: 'user', component: UserComponent, canActivate: [accessUserGuard] },
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
