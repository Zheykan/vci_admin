import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UnidadService {
  // Si es necesario, cambiar en la url "Backend_vci_admin" por "Backend_VCI_Admin"
  url = 'http://localhost/Backend_vci_admin/Controller/unity.php';

  constructor(private http: HttpClient) { }

  consultar(){
    return this.http.get(`${this.url}?control=consulta`) ;
  }
  insertar(params:any){
    return this.http.post(`${this.url}?control=insertar`, JSON.stringify(params)) ;
  }
  editar(id:number, params:any){
    return this.http.post(`${this.url}?control=editar&id=${id}`, JSON.stringify(params)) ;
  }
  eliminar(id:number){
    return this.http.get(`${this.url}?control=eliminar&id=${id}`) ;
  }
  filtro(valor:any){
    return this.http.get(`${this.url}?control=filtrar&valor=${valor}`) ;
  }
}
