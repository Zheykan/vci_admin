import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  // Si es necesario, cambiar en la url "Backend_vci_admin" por "Backend_VCI_Admin"
  url = 'http://localhost/Backend_vci_admin/Controller/role.php';

  constructor(private http: HttpClient) { }

  consultar(){
    return this.http.get(`${this.url}?control=consulta`) ;
  }
  filtro(valor:any){
    return this.http.get(`${this.url}?control=filtrar&valor=${valor}`) ;
  }
}
