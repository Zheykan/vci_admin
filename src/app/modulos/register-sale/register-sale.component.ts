import { Component } from '@angular/core';
import { ClienteService } from '../../servicios/cliente.service';
import { UsuarioService } from '../../servicios/usuario.service';
import { VentaService } from '../../servicios/venta.service';

@Component({
  selector: 'app-register-sale',
  templateUrl: './register-sale.component.html',
  styleUrl: './register-sale.component.scss'
})
export class RegisterSaleComponent {

  venta: any ;
  obj_venta = {
    id_venta : 0 ,
    fecha : "" ,
    FO_usuario_vendedor : 0 ,
    FO_cliente : 0 ,
    productos_venta : "" ,
    cantidad_venta : "" ,
    subtotal : 0 ,
    impuestos : 0 ,
    total : 0
  }
  vendedor: any ;
  cliente: any ;

  validate_fac = true ;
  validate_date = true ;
  validate_vend = true ;
  validate_cli = true ;
  validate_list = true ;
  validate_cant = true ;
  validate_subt = true ;
  validate_imp = true ;
  validate_t = true ;

  constructor(private ssale: VentaService, private suser: UsuarioService,
  private sclient: ClienteService){}
  
  ngOnInit(): void{
    this.consulta() ;
    this.consulta_c() ;
    this.consulta_v() ;
  }

  consulta(){
    this.ssale.consultar().subscribe((resultado: any) => 
    {this.venta = resultado ;})
  }
  consulta_c(){
    this.sclient.consultar().subscribe((resultado: any) => 
    {this.cliente = resultado ;})
  }
  consulta_v(){
    this.suser.consultar().subscribe((resultado: any) => 
    {this.vendedor = resultado ;})
  }

  validar_info(){
    if(this.obj_venta.id_venta == 0){
      this.validate_fac = false ;
    }else{
      this.validate_fac = true ;
    }
    if(this.obj_venta.fecha == ""){
      this.validate_date = false ;
    }else{
      this.validate_date = true ;
    }
    if(this.obj_venta.FO_usuario_vendedor == 0){
      this.validate_vend = false ;
    }else{
      this.validate_vend = true ;
    }
    if(this.obj_venta.FO_cliente == 0){
      this.validate_cli = false ;
    }else{
      this.validate_cli = true ;
    }
    if(this.obj_venta.productos_venta == ""){
      this.validate_list = false ;
    }else{
      this.validate_list = true ;
    }
    if(this.obj_venta.cantidad_venta == ""){
      this.validate_cant = false ;
    }else{
      this.validate_cant = true ;
    }
    if(this.obj_venta.subtotal == 0){
      this.validate_subt = false ;
    }else{
      this.validate_subt = true ;
    }
    if(this.obj_venta.impuestos == 0){
      this.validate_imp = false ;
    }else{
      this.validate_imp = true ;
    }
    if(this.obj_venta.total == 0){
      this.validate_t = false ;
    }else{
      this.validate_t = true ;
    }
    if (this.validate_fac == true && this.validate_date == true && 
      this.validate_vend == true && this.validate_cli == true && 
      this.validate_list == true && this.validate_cant == true && 
      this.validate_subt == true && this.validate_imp == true && 
      this.validate_t == true) {
        this.registrar_sl() ;
    }
  }

  registrar_sl(){
    this.ssale.insertar(this.obj_venta).subscribe((datos: any) => 
    {
      if (datos['resultado'] == 'OK') {
        this.consulta() ;
      }
    }) ;
  }
}
