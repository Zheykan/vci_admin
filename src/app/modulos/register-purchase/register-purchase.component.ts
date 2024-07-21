import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CompraService } from '../../servicios/compra.service';
import { ProveedorService } from '../../servicios/proveedor.service';

@Component({
  selector: 'app-register-purchase',
  templateUrl: './register-purchase.component.html',
  styleUrl: './register-purchase.component.scss'
})
export class RegisterPurchaseComponent {

  compra: any ;
  obj_compra = {
    id_compra : 0 ,
    FO_proveedor : 0 ,
    fecha_adq : "" ,
    lista_prod : [] ,
    total : 0
  }
  proveedor: any ;
  nombre: any ;
  cantidad: number = 0 ;
  precio_p: number = 0 ;
  lista_sumin: any = [] ;
  detail_p: any = [] ;
  subtotal = 0 ;
  iva = 0.16 ;
  impuestos = 0 ;
  total_v = 0 ;
  productos: any ;
  maximo : any ;

  validate_fac = true ;
  validate_prov = true ;
  validate_fecha = true ;
  validate_prod = true ;
  validate_cant = true ;
  validate_precio = true ;
  validate_t = true ;
  
  constructor(private spurch: CompraService, private sprovider: ProveedorService,
    private srouter: Router){}
  ngOnInit(): void{
    this.consulta() ;
    this.consulta_pv() ;
    this.consulta_mx() ;
  }
  
  consulta(){
    this.spurch.consultar().subscribe((resultado: any) => 
    {this.compra = resultado ;})
  }

  consulta_pv(){
    this.sprovider.consultar().subscribe((resultado: any) => 
    {this.proveedor = resultado ;})
  }

  consulta_mx(){
    this.spurch.maximo().subscribe((resultado: any) => {
      this.maximo = Number(resultado[0][0]) ;
    }) ;
  }

  limpiar(){
    this.obj_compra = {
      id_compra : 0 ,
      FO_proveedor : 0 ,
      fecha_adq : "" ,
      lista_prod : [] ,
      total : 0
    }
    this.detail_p = [] ;
    this.lista_sumin = [] ;
    this.subtotal = 0 ;
    this.impuestos = 0 ;
    this.total_v = 0 ;
  }

  limpiar_prd(){
    this.nombre = "" ;
    this.cantidad = 0 ;
    this.precio_p = 0 ;
  }

  validar_info(){
    if(this.obj_compra.id_compra == 0){
      this.validate_fac = false ;
    }else{
      this.validate_fac = true ;
    }
    if(this.obj_compra.FO_proveedor == 0){
      this.validate_prov = false ;
    }else{
      this.validate_prov = true ;
    }
    if(this.obj_compra.fecha_adq == "" || this.obj_compra.fecha_adq == null){
      this.validate_fecha = false ;
    }else{
      this.validate_fecha = true ;
    }
    if(this.obj_compra.total == 0){
      this.validate_t = false ;
    }else{
      this.validate_t = true ;
    }
    if (this.validate_fac == true && this.validate_prov == true && 
      this.validate_fecha == true && this.validate_t == true) {
        this.registrar_pch() ;
        this.limpiar() ;
        this.srouter.navigate(['purchase']) ;
    }
  }

  validar_prod(){
    if (this.nombre == "" || this.nombre == null) {
      this.validate_prod = false ;
    }else{
      this.validate_prod = true ;
    }
    if (this.cantidad == 0) {
      this.validate_cant = false ;
    }else{
      this.validate_cant = true ;
    }
    if (this.precio_p == 0) {
      this.validate_precio = false ;
    }else{
      this.validate_precio = true ;
    }
    if (this.validate_prod == true && this.validate_cant == true && 
      this.validate_precio == true) {
      this.seleccionar_prd() ;
      this.limpiar_prd() ;
    }
  }

  seleccionar_prd(){
    this.detail_p = [this.nombre, Number(this.cantidad), Number(this.precio_p), Number(this.cantidad) * Number(this.precio_p)] ;
    this.lista_sumin.push(this.detail_p) ;
    // corroborar el almacenaje de la descripcion del producto dentro de la matriz
    //console.log(this.lista_sumin) ;
    let size = this.lista_sumin.length;
    this.total_v = 0 ;
    for (let index = 0; index < size; index++) {
      this.total_v += this.lista_sumin[index][3] ;
      //console.log(this.total_v) ;
    }
    this.impuestos = this.total_v * this.iva ;
    this.subtotal = this.total_v - this.impuestos ;
    this.obj_compra.lista_prod = this.lista_sumin ;
    this.obj_compra.total = this.total_v ;
    //console.log(this.obj_compra) ;
  }

  quitar_prd(valores: any){
    let idnc = this.lista_sumin.indexOf(valores) ;
    this.lista_sumin.splice(idnc, 1) ;
    // corroborar la eliminación de la descripcion del producto dentro de la matriz
    //console.log(this.lista_sumin) ;
    let size = this.lista_sumin.length ;
    this.total_v = 0 ;
    for (let index = 0; index < size; index++) {
      this.total_v += this.lista_sumin[index][4] ;
      //console.log(this.total_v) ;
    }
    this.impuestos = this.total_v * this.iva ;
    this.subtotal = this.total_v - this.impuestos ;
    this.obj_compra.lista_prod = this.lista_sumin ;
    this.obj_compra.total = this.total_v ;
    //console.log(this.obj_compra) ;
  }

  registrar_pch(){
    this.spurch.insertar(this.obj_compra).subscribe((datos: any) => {
      if (datos['resultado'] == 'OK') {
        console.log(datos['resultado'])
        this.consulta() ;
      }
    }) ;
  }
}
