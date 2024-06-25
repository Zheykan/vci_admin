import { Component } from '@angular/core';
import { MarcaService } from '../../servicios/marca.service';
import { ProductoService } from '../../servicios/producto.service';
import { UnidadService } from '../../servicios/unidad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  
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
  unidad: any ;
  obj_unidad = {
    id_unidad : 0 ,
    nombre : ""
  }
  marca: any ;
  obj_marca = {
    id_marca : 0 ,
    nombre : ""
  }
  id_preservado: any ;
  dato: any ;
  obtenido: any;
  FO_rol: any ;
  rol : any ;

  validate_cod = true ;
  validate_name = true ;
  validate_mark = true ;
  validate_cant = true ;
  validate_med = true ;
  validate_und = true ;
  validate_price = true ;
  validate_datev = true ;
  validate_u_name = true ;
  validate_m_name = true ;
  most_u = false ;
  most_m = false ;
  most_edit = false ;
  most_stock = false ;
  most_precio = false ;
  most_fecha = false ;

  constructor(private sproduct: ProductoService, private sunid: UnidadService,
    private smark: MarcaService){}
  ngOnInit(): void{
    this.consulta() ;
    this.consulta_u() ;
    this.consulta_m() ;
    this.FO_rol = sessionStorage.getItem("FO_rol") ;
    this.rol = sessionStorage.getItem("rol") ;
    this.busqueda(this.dato) ;
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
    this.sunid.consultar().subscribe((resultado: any) =>
    {this.unidad = resultado ;})
  }

  mostrar_u(dato: any){
    switch(dato){
      case "mostrar":
        this.most_u = true ;
      break ;
      case "ocultar":
        this.most_u = false ;
      break ;
    }
    this.limpiar() ;
  }
  mostrar_m(dato: any){
    switch(dato){
      case "mostrar":
        this.most_m = true ;
      break ;
      case "ocultar":
        this.most_m = false ;
      break ;
    }
    this.limpiar() ;
  }
  mostrar_edit(dato: any){
    switch(dato){
      case "mostrar":
        this.most_edit = true ;
        this.most_stock = false ;
        this.most_precio = false ;
        this.most_fecha = false ;
      break ;
      case "ocultar":
        this.most_edit = false ;
      break ;
    }
    this.limpiar() ;
  }
  mostrar_stock(dato: any){
    switch(dato){
      case "mostrar":
        this.most_stock = true ;
        this.most_edit = false ;
        this.most_precio = false ;
        this.most_fecha = false ;
      break ;
      case "ocultar":
        this.most_stock = false ;
      break ;
    }
    this.limpiar() ;
  }
  mostrar_precio(dato: any){
    switch(dato){
      case "mostrar":
        this.most_precio = true ;
        this.most_edit = false ;
        this.most_stock = false ;
        this.most_fecha = false ;
      break ;
      case "ocultar":
        this.most_precio = false ;
      break ;
    }
    this.limpiar() ;
  }
  mostrar_fecha(dato: any){
    switch(dato){
      case "mostrar":
        this.most_fecha = true ;
        this.most_edit = false ;
        this.most_stock = false ;
        this.most_precio = false ;
      break ;
      case "ocultar":
        this.most_fecha = false ;
      break ;
    }
    this.limpiar() ;
  }

  limpiar(){
    this.obj_unidad = {
      id_unidad : 0 ,
      nombre : ""
    }
    this.obj_marca = {
      id_marca : 0 ,
      nombre : ""
    }
    this.obj_producto = {
      id_producto : 0 ,
      nombre : "" ,
      FO_marca : 0 ,
      cantidad_producto : 0 ,
      medida : 0 ,
      FO_unidad : 0 ,
      precio_venta : 0 ,
      fecha_venc : 0
    }
  }

  precarga_form(items: any, id: number){
    this.obj_producto = {
      id_producto : items.id_producto ,
      nombre : items.nombre ,
      FO_marca : items.FO_marca ,
      cantidad_producto : items.cantidad_producto ,
      medida : items.medida ,
      FO_unidad : items.FO_unidad ,
      precio_venta : items.precio_venta ,
      fecha_venc : items.fecha_venc
    }
    this.id_preservado = id ;
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
      this.editar_p() ;
    }
  }

  editar_p(){
    this.sproduct.editar(this.id_preservado,this.obj_producto).subscribe((datos: any) =>
    {
      if (datos['resultado'] == 'OK'){
        this.consulta() ;
      }
    }) ;
  }

  validar_info_u(){
    if(this.obj_unidad.nombre == ""){
      this.validate_u_name = false ;
    }else{
      this.validate_u_name = true ;
    }
    if(this.validate_u_name == true){
      this.registrar_u() ;
    }
  }
  registrar_u(){
    this.sunid.insertar(this.obj_unidad).subscribe((datos: any) =>
    {
      if(datos['resultado'] == 'OK'){
        this.consulta_u();
      }
    }) ;
    this.limpiar() ;
    this.mostrar_u('ocultar') ;
  }

  validar_info_m(){
    if(this.obj_marca.nombre == ""){
      this.validate_m_name = false ;
    }else{
      this.validate_m_name = true ;
    }
    if(this.validate_m_name == true){
      this.registrar_m() ;
    }
  }
  registrar_m(){
    this.smark.insertar(this.obj_marca).subscribe((datos: any) =>
    {
      if(datos['resultado'] == 'OK'){
        this.consulta_m();
      }
    }) ;
    this.limpiar() ;
    this.mostrar_m('ocultar') ;
  }

  busqueda(dato: any): void{
    if(dato != 0 || dato != ""){
      this.sproduct.filtro(dato).subscribe((resultado: any) =>
      {this.obtenido = resultado ;
      })
    }
  }

  eliminar(id: number){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success mx-3",
        cancelButton: "btn btn-danger mx-3"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "¿Estas de acuerdo?",
      text: "Estas a punto de eliminar este elemento, no podras deshacer esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, BORRAR!",
      cancelButtonText: "No, cancelar!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "Eliminado!",
          text: "¡Este registro de producto ha sido eliminado!",
          icon: "success"
        });
        this.sproduct.eliminar(id).subscribe((datos: any) => 
        {
          if(datos['resultado'] == 'OK'){
            this.consulta() ;
          }
        }) ;
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Operación Cancelada",
          text: "¡El registro no se eliminara!",
          icon: "error"
        });
      }
    });
  }
}
