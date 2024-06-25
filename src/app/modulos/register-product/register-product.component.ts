import { Component } from '@angular/core';
import { MarcaService } from '../../servicios/marca.service';
import { ProductoService } from '../../servicios/producto.service';
import { UnidadService } from '../../servicios/unidad.service';

@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.component.html',
  styleUrl: './register-product.component.scss'
})

export class RegisterProductComponent {

  producto: any ;
  obj_producto = {
    id_producto : 0 ,
    nombre : "" ,
    FO_marca : 0 ,
    cantidad_producto : 0 ,
    medida : 0 ,
    FO_unidad : 0 ,
    precio_venta : 0 ,
    fecha_venc : 0
  }
  marca: any ;
  unidad: any ;

  validate_cod = true ;
  validate_name = true ;
  validate_mark = true ;
  validate_cant = true ;
  validate_med = true ;
  validate_und = true ;
  validate_price = true ;
  validate_datev = true ;

  constructor(private sproduct: ProductoService, private smark: MarcaService, 
  private sunit: UnidadService){}
  ngOnInit(): void{
    this.consulta() ;
    this.consulta_m() ;
    this.consulta_u() ;
  }
  
  consulta(){
    this.sproduct.consultar().subscribe((resultado: any) =>
    {this.producto = resultado ;})
  }
  consulta_m(){
    this.smark.consultar().subscribe((resultado: any) =>
    {this.marca = resultado ;})
  }
  consulta_u(){
    this.sunit.consultar().subscribe((resultado: any) =>
    {this.unidad = resultado ;})
  }

  validar_info(){
    if(this.obj_producto.id_producto == 0){
      this.validate_cod = false ;
    }else{
      this.validate_cod = true ;
    }
    if(this.obj_producto.nombre == ""){
      this.validate_name = false ;
    }else{
      this.validate_name = true ;
    }
    if(this.obj_producto.FO_marca == 0){
      this.validate_mark = false ;
    }else{
      this.validate_mark = true ;
    }
    if(this.obj_producto.cantidad_producto == 0){
      this.validate_cant = false ;
    }else{
      this.validate_cant = true ;
    }
    if(this.obj_producto.medida == 0){
      this.validate_med = false ;
    }else{
      this.validate_med = true ;
    }
    if(this.obj_producto.FO_unidad == 0){
      this.validate_und = false ;
    }else{
      this.validate_und = true ;
    }
    if(this.obj_producto.precio_venta == 0){
      this.validate_price = false ;
    }else{
      this.validate_price = true ;
    }
    if(this.obj_producto.fecha_venc == 0){
      this.validate_datev = false ;
    }else{
      this.validate_datev = true ;
    }
    if(this.validate_cod == true && this.validate_name == true && 
      this.validate_mark == true && this.validate_cant == true && 
      this.validate_med == true && this.validate_und == true && 
      this.validate_price == true && this.validate_datev == true){
        this.registrar_p() ;
    }
  }

  registrar_p(){
    this.sproduct.insertar(this.obj_producto).subscribe((datos: any) =>
    {
      if(datos['resultado'] == 'OK'){
        this.consulta() ;
      }
    }) ;
  }
}
