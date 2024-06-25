//-- Desde Angular 16 el guard deja de crearse como una clase, --
//-- se convierte el contenido a una clase exportable. --
/*import { CanActivateFn } from '@angular/router';

export const accessUserGuard: CanActivateFn = (route, state) => {
  return true;
};*/

import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from "@angular/router"
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class accessUserGuard implements CanActivate {

  id_user: any ;

  constructor(private srouter: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.id_user = sessionStorage.getItem('id') ;
      if (this.id_user == null || this.id_user == "" || this.id_user == 0) {
        this.srouter.navigate(['login']);
        return false ;
      }
      return true ;
    }
}