import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  // Si es necesario, cambiar en la url "Backend_vci_admin" por "Backend_VCI_Admin"
  url = 'http://localhost/Backend_vci_admin/Controller/product.php' ;

  constructor(private http: HttpClient) {}

  consultar(){
    //console.log(`${this.url}?control=consulta`);
    return this.http.get(`${this.url}?control=consulta`) ;
  }
  insertar(params:any){
    //console.log(params);
    return this.http.post(`${this.url}?control=insertar`, JSON.stringify(params)) ;
  }
  editar(id:number, params:any){
    //console.log(params);
    return this.http.post(`${this.url}?control=editar&id=${id}`, JSON.stringify(params)) ;
  }
  stock(id:number, params:any){
    //console.log(params);
    return this.http.post(`${this.url}?control=stock&id=${id}`, JSON.stringify(params)) ;
  }
  eliminar(id:number){
    //console.log(`${this.url}?control=eliminar&id=${id}`);
    return this.http.get(`${this.url}?control=eliminar&id=${id}`) ;
  }
  filtro(valor:any){
    return this.http.get(`${this.url}?control=filtrar&valor=${valor}`) ;
  }
}
