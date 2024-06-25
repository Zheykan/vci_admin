import { Component } from '@angular/core';
import { CiudadService } from '../../servicios/ciudad.service';
import { DepartamentoService } from '../../servicios/departamento.service';
import { ProveedorService } from '../../servicios/proveedor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrl: './provider.component.scss'
})
export class ProviderComponent {

  proveedor: any ;
  obj_proveedor = {
    id_proveedor_nit : 0 ,
    razon_social : "" ,
    contacto : "" ,
    telefono : "" ,
    correo : "" ,
    direccion: "" ,
    FO_ciudad : 0
  }
  ciudad: any ;
  obj_ciudad = {
    id_ciudad : 0 ,
    nombre : "" ,
    FO_departamento : 0
  }
  departamento: any ;
  id_preservado: any ;
  dato: any ;
  obtenido: any;

  validate_nit = true ;
  validate_razon = true ;
  validate_cont = true ;
  validate_tel = true ;
  validate_mail = true ;
  validate_dir = true ;
  validate_city = true ;
  validate_c_nombre = true ;
  validate_c_dep = true ;
  most_edit = false ;
  most_c = false ;

  constructor(private sprovider: ProveedorService, private scity: CiudadService, 
    private sdept: DepartamentoService){}
  ngOnInit(): void{
    this.consulta() ;
    this.consulta_c() ;
    this.consulta_d() ;
    this.busqueda(this.dato) ;
  }

  consulta(){
    this.sprovider.consultar().subscribe((resultado: any) =>
    {this.proveedor = resultado ;})
  }
  consulta_c(){
    this.scity.consultar().subscribe((resultado: any) =>
    {this.ciudad = resultado ;})
  }
  consulta_d(){
    this.sdept.consultar().subscribe((resultado: any) => 
    {this.departamento = resultado ;})
  }

  mostrar_edit(dato: any){
    switch(dato){
      case "mostrar":
        this.most_edit = true ;
      break ;
      case "ocultar":
        this.most_edit = false ;
      break ;
    }
    this.limpiar() ;
  }
  mostrar_c(dato: any){
    switch(dato){
      case "mostrar":
        this.most_c = true ;
      break ;
      case "ocultar":
        this.most_c = false ;
      break ;
    }
    this.limpiar() ;
  }

  limpiar(){
    this.obj_ciudad = {
      id_ciudad : 0 ,
      nombre : "" ,
      FO_departamento: 0
    }
    this.obj_proveedor = {
      id_proveedor_nit : 0 ,
      razon_social : "" ,
      contacto : "" ,
      telefono : "" ,
      correo : "" ,
      direccion: "" ,
      FO_ciudad : 0
    }
  }

  validar_info(){
    if(this.obj_proveedor.id_proveedor_nit == 0){
      this.validate_nit = false ;
    }else{
      this.validate_nit = true ;
    }
    if(this.obj_proveedor.razon_social == ""){
      this.validate_razon = false ;
    }else{
      this.validate_razon = true ;
    }
    if(this.obj_proveedor.contacto == ""){
      this.validate_cont = false ;
    }else{
      this.validate_cont = true ;
    }
    if(this.obj_proveedor.telefono == ""){
      this.validate_tel = false ;
    }else{
      this.validate_tel = true ;
    }
    if(this.obj_proveedor.correo == ""){
      this.validate_mail = false ;
    }else{
      this.validate_mail = true ;
    }
    if(this.obj_proveedor.direccion == ""){
      this.validate_dir = false ;
    }else{
      this.validate_dir = true ;
    }
    if(this.obj_proveedor.FO_ciudad == 0){
      this.validate_city = false ;
    }else{
      this.validate_city = true ;
    }
    if (this.validate_nit == true && this.validate_razon == true && 
      this.validate_cont == true && this.validate_tel == true && 
      this.validate_mail == true && this.validate_dir == true && 
      this.validate_city == true) {
      this.editar_pv() ;
      }
    }
  
  editar_pv(){
    this.sprovider.editar(this.id_preservado,this.obj_proveedor).subscribe((datos: any) =>
    {
      if (datos['resultado'] == 'OK'){
        this.consulta() ;
      }
    }) ;
  }

  validar_info_c(){
    if(this.obj_ciudad.nombre == ""){
      this.validate_c_nombre = false ;
    }else{
      this.validate_c_nombre = true ;
    }
    if(this.obj_ciudad.FO_departamento == 0){
      this.validate_c_dep = false ;
    }else{
      this.validate_c_dep = true ;
    }
    if(this.validate_c_nombre == true && this.validate_c_dep == true){
      this.registrar_c() ;
    }
  }

  registrar_c(){
    this.scity.insertar(this.obj_ciudad).subscribe((datos: any) => 
    {
      if(datos['resultado'] == 'OK'){
        this.consulta_c();
      }
    }) ;
    this.limpiar() ;
    this.mostrar_c('ocultar') ;
  }

  precarga_form(items: any, id: number){
    this.obj_proveedor = {
      id_proveedor_nit : items.id_proveedor_nit ,
      razon_social : items.razon_social ,
      contacto : items.contacto ,
      telefono : items.telefono ,
      correo : items.correo ,
      direccion: items.direccion ,
      FO_ciudad : items.FO_ciudad
    }
    this.id_preservado = id ;
  }

  busqueda(dato: any): void{
    if(dato != 0 || dato != ""){
      this.sprovider.filtro(dato).subscribe((resultado: any) =>
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
          text: "¡Este registro de proveedor ha sido eliminado!",
          icon: "success"
        });
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

    this.sprovider.eliminar(id).subscribe((datos: any) => 
    {
      if(datos['resultado'] == 'OK'){
        this.consulta() ;
      }
    }) ;
  }
}
