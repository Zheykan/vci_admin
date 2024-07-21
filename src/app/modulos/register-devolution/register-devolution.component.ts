//import { Component } from '@angular/core';
//
//@Component({
//  selector: 'app-register-devolution',
//  templateUrl: './register-devolution.component.html',
//  styleUrl: './register-devolution.component.scss'
//})
//export class RegisterDevolutionComponent {
//
//}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DevolucionService } from '../../servicios/devolucion.service';
import { VentaService } from '../../servicios/venta.service';

@Component({
  selector: 'app-register-devolution',
  templateUrl: './register-devolution.component.html',
  styleUrl: './register-devolution.component.scss'
})
export class RegisterDevolutionComponent {

  devolucion: any ;
  obj_dev = {
  FO_venta : 0 ,
  fecha : "" ,
  FO_vendedor : 0 ,
  lista_dev : [] ,
  total : 0
  }
  lista_prod: any = [] ;
  lista_devol: any = [] ;
  detail_p: any = [] ;
  stock_p = 0 ;
  subtotal = 0 ;
  iva = 0.16 ;
  impuestos = 0 ;
  total_d = 0 ;
  venta: any ;
  vendedor_n: any ;
  id_v = 0 ;
  pos = 0 ;
  valor = 0 ;
  obtenido: any;
  id_user: any ;
  FO_rol: any ;
  rol: any ;

  validate_fac = true ;
  validate_date = true ;
  validate_vend = true ;
  validate_cli = true ;
  validate_list = true ;
  validate_cant = true ;
  validate_subt = true ;
  validate_t = true ;
  most_busq = false ;
  most_dev = false ;
  most_stock = false ;

  constructor(private sdevol: DevolucionService, private ssale: VentaService,
    private srouter: Router){}

  ngOnInit(): void{
    this.consulta() ;
    this.consulta_v() ;
    this.obj_dev.FO_vendedor = Number(sessionStorage.getItem("id")) ;
    this.vendedor_n = sessionStorage.getItem("nombre") ;
    this.FO_rol = sessionStorage.getItem("FO_rol") ;
    this.rol = sessionStorage.getItem("rol") ;
    this.busqueda(this.id_v) ;
  }

  consulta(){
    this.sdevol.consultar().subscribe((resultado: any) => 
    {this.devolucion = resultado ;})
  }

  consulta_v(){
    this.ssale.consultar().subscribe((resultado: any) => 
    {this.venta = resultado ;})
  }

  mostrar_busq(dato: any){
    switch(dato){
      case "mostrar":
        this.most_busq = true ;
      break ;
      case "ocultar":
        this.most_busq = false ;
      break ;
    }
  }

  mostrar_stock(dato: any){
    switch(dato){
      case "mostrar":
        this.most_stock = true ;
      break ;
      case "ocultar":
        this.most_stock = false ;
      break ;
    }
  }

  limpiar(){
    this.obj_dev = {
      FO_venta : 0 ,
      fecha : "" ,
      FO_vendedor : 0 ,
      lista_dev : [] ,
      total : 0
    }
    this.stock_p = 0 ;
    this.detail_p = [] ;
    this.lista_devol = [] ;
    this.subtotal = 0 ;
    this.impuestos = 0 ;
    this.total_d = 0 ;
  }

  validar_info(){
    if(this.obj_dev.FO_venta == 0){
      this.validate_fac = false ;
    }else{
      this.validate_fac = true ;
    }
    if(this.obj_dev.fecha == "" || this.obj_dev.fecha == null){
      this.validate_date = false ;
    }else{
      this.validate_date = true ;
    }
    if(this.obj_dev.FO_vendedor == 0){
      this.validate_vend = false ;
    }else{
      this.validate_vend = true ;
    }
    if(this.obj_dev.total == 0){
      this.validate_t = false ;
    }else{
      this.validate_t = true ;
    }
    if (this.validate_fac == true && this.validate_date == true && 
      this.validate_vend == true && this.validate_cli == true && 
      this.validate_t == true) {
        this.registrar_dev() ;
        this.limpiar() ;
        this.most_busq = false ;
        this.srouter.navigate(['devolution']) ;
    }
  }

  validar_cnt(){
    // ver por que no puedo elegir el elemento a validar siempre toma el primer valor
    let valores = this.lista_prod[this.pos] ;
    let stock_g = Number(valores[2]);
    //console.log(valores) ;
    if(this.stock_p == 0 || this.stock_p > stock_g){
      this.validate_cant = false ;
      this.stock_p = 0 ;
    }else{
      this.validate_cant = true ;
    }
    if (this.validate_cant == true){
      this.seleccionar_prd(valores);
      this.most_dev = true ;
      this.stock_p = 0 ;
    }
  }

  seleccionar_prd(valores: any){
    //let cant_ing = Number(prompt("Cantidad requerida (no debe ser mayor a "+valores.cantidad_producto+"):")) ;
    // cargamos la matriz para actualizar la lista de venta en base de datos
    this.detail_p = [valores[0], valores[1], this.stock_p, Number(valores[3]), this.stock_p * Number(valores[3])] ;
    this.lista_devol.push(this.detail_p) ;
    //this.new_cant.push(this.detail_p) ;
    // corroborar el almacenaje de la descripcion del producto dentro de la matriz
    //console.log(this.lista_venta) ;
    let size = this.lista_devol.length;
    this.total_d = 0 ;
    for (let index = 0; index < size; index++) {
      this.total_d += this.lista_devol[index][4] ;
      //console.log(this.total_v) ;
    }
    this.impuestos = this.total_d * this.iva ;
    this.subtotal = this.total_d - this.impuestos ;
    this.obj_dev.FO_venta = this.id_v ;
    this.obj_dev.lista_dev = this.lista_devol ;
    this.obj_dev.total = this.total_d ;
    //console.log(this.obj_venta) ;
  }

  quitar_prd(valores: any){
    let idnc = this.lista_devol.indexOf(valores) ;
    this.lista_devol.splice(idnc, 1) ;
    // corroborar la eliminación de la descripcion del producto dentro de la matriz
    //console.log(this.lista_venta) ;
    let size = this.lista_devol.length ;
    this.total_d = 0 ;
    for (let index = 0; index < size; index++) {
      this.total_d += this.lista_devol[index][4] ;
      //console.log(this.total_v) ;
    }
    this.impuestos = this.total_d * this.iva ;
    this.subtotal = this.total_d - this.impuestos ;
    this.obj_dev.lista_dev = this.lista_devol ;
    this.obj_dev.total = this.total_d ;
    //console.log(this.obj_venta) ;
  }

  registrar_dev(){
    //let fecha_t = new Date() ;
    //this.obj_venta.fecha = `${fecha_t.getFullYear()}-${fecha_t.getMonth()+1}-${fecha_t.getDate()}` ;
    this.sdevol.insertar(this.obj_dev).subscribe((datos: any) => {
      if (datos['resultado'] == 'OK') {
        console.log(datos['resultado']) ;
        this.consulta() ;
      }
    }) ;
  }

  precarga_form(items: any, id: number){
    this.ssale.expand(id).subscribe((resultado: any) =>
    {this.lista_prod = resultado ;}
    )
  }

  position(items: any){
    this.pos = this.lista_prod.indexOf(items) ;
    this.valor = Number(this.lista_prod[this.pos][2]) ;
  }

  busqueda(id: number): void{
    if(id != 0){
      this.ssale.found(id).subscribe((resultado: any) =>
      {this.obtenido = resultado ;
      this.precarga_form(this.obtenido,id) ;
      //console.log(id, this.obtenido) ;
      })
    }
  }
}
