import { Component } from '@angular/core';
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
    lista_prod : "" ,
    cantidad_adq : "" ,
    preciop_compra : "" ,
    subtotal : 0.0 ,
    impuestos: 0.0 ,
    total : 0.0
  }
  proveedor: any ;

  validate_fac = true ;
  validate_prov = true ;
  validate_fecha = true ;
  validate_lista = true ;
  validate_cant = true ;
  validate_precio = true ;
  validate_subt = true ;
  validate_imp = true ;
  validate_t = true ;
  
  constructor(private spurch: CompraService, private sprovider: ProveedorService){}
  ngOnInit(): void{
    this.consulta() ;
    this.consulta_pv() ;
  }
  
  consulta(){
    this.spurch.consultar().subscribe((resultado: any) => 
    {this.compra = resultado ;})
  }
  consulta_pv(){
    this.sprovider.consultar().subscribe((resultado: any) => 
    {this.proveedor = resultado ;})
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
    if(this.obj_compra.fecha_adq == ""){
      this.validate_fecha = false ;
    }else{
      this.validate_fecha = true ;
    }
    if(this.obj_compra.lista_prod == ""){
      this.validate_lista = false ;
    }else{
      this.validate_lista = true ;
    }
    if(this.obj_compra.cantidad_adq == ""){
      this.validate_cant = false ;
    }else{
      this.validate_cant = true ;
    }
    if(this.obj_compra.preciop_compra == ""){
      this.validate_precio = false ;
    }else{
      this.validate_precio = true ;
    }
    if(this.obj_compra.subtotal == 0){
      this.validate_subt = false ;
    }else{
      this.validate_subt = true ;
    }
    if(this.obj_compra.impuestos == 0){
      this.validate_imp = false ;
    }else{
      this.validate_imp = true ;
    }
    if(this.obj_compra.total == 0){
      this.validate_t = false ;
    }else{
      this.validate_t = true ;
    }
    if (this.validate_fac == true && this.validate_prov == true && 
      this.validate_fecha == true && this.validate_lista == true && 
      this.validate_cant == true && this.validate_precio == true && 
      this.validate_subt == true && this.validate_imp == true && 
      this.validate_t == true) {
        this.registrar_pch() ;
    }
  }

  registrar_pch(){
    this.spurch.insertar(this.obj_compra).subscribe((datos: any) => 
    {
      if (datos['resultado'] == 'OK') {
        this.consulta() ;
      }
    }) ;
  }
}
