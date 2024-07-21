import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // Si es necesario, cambiar en la url "Backend_vci_admin" por "Backend_VCI_Admin"
  //url = 'http://localhost/Backend_vci_admin/Controller/login.php';
  url = 'http://www.vciadmingestor.whf.bz.mialias.net/Controller/login.php';

  constructor(private http: HttpClient) { }

  consulta(email: any, passwrd: any){
    //-- Examinar que se realiza el ingreso de parametros desde el login(html) --
    //console.log(`${this.url}?email=${email}&passwrd=${passwrd}`) ;
    return this.http.get(`${this.url}?email=${email}&passwrd=${passwrd}`) ;
  }
}

