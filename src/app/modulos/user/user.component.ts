import { Component } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario.service';
import Swal from 'sweetalert2';
import { RolService } from '../../servicios/rol.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  usuario: any ;
  obj_usuario = {
    nombre : "" ,
    contrasenia : "" ,
    telefono : "" ,
    correo : "" ,
    FO_rol : 0 ,
    caja : 0
  }
  rol: any ;
  id_preservado: any ;
  dato: any ;
  obtenido: any;
  FO_rol: any ;

  validate_name = true ;
  validate_pass = true ;
  validate_tel = true ;
  validate_email = true ;
  validate_rol = true ;
  validate_box = true ;
  most_edit = false ;
  most_busq = false ;

  constructor(private suser: UsuarioService, private srole: RolService){}
  ngOnInit(): void{
    this.consulta() ;
    this.consulta_r() ;
    this.FO_rol = sessionStorage.getItem("FO_rol") ;
    this.busqueda(this.dato) ;
  }

  consulta(){
    this.suser.consultar().subscribe((resultado: any) =>
    {this.usuario = resultado ;})
  }
  consulta_r(){
    this.srole.consultar().subscribe((resultado: any) =>
    {this.rol = resultado ;})
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

  mostrar_busq(dato: any){
    switch(dato){
      case "mostrar":
        this.most_busq = true ;
        this.most_edit = false ;
      break ;
      case "ocultar":
        this.most_busq = false ;
      break ;
    }
    this.dato = "" ;
  }

  limpiar(){
    this.obj_usuario = {
      nombre : "" ,
      contrasenia : "" ,
      telefono : "" ,
      correo : "" ,
      FO_rol : 0 ,
      caja : 0
    }
  }

  validar_info(){
    if(this.obj_usuario.nombre == ""){
      this.validate_name = false ;
    }else{
      this.validate_name = true ;
    }
    if(this.obj_usuario.contrasenia == ""){
      this.validate_pass = false ;
    }else{
      this.validate_pass = true ;
    }
    if(this.obj_usuario.telefono == ""){
      this.validate_tel = false ;
    }else{
      this.validate_tel = true ;
    }
    if(this.obj_usuario.correo == ""){
      this.validate_email = false ;
    }else{
      this.validate_email = true ;
    }
    if(this.obj_usuario.FO_rol == 0){
      this.validate_rol = false ;
    }else{
      this.validate_rol = true ;
    }
    if(this.validate_name == true && this.validate_pass == true && 
      this.validate_tel == true && this.validate_email == true && 
      this.validate_rol == true){
        this.editar_u() ;
    }
  }

  editar_u(){
    this.suser.editar(this.id_preservado,this.obj_usuario).subscribe((datos: any) =>
    {
      if (datos['resultado'] == 'OK'){
        this.consulta() ;
      }
    }) ;
  }

  precarga_form(items: any, id: number){
    this.obj_usuario = {
      nombre : items.nombre ,
      contrasenia : items.contrasenia ,
      telefono : items.telefono ,
      correo : items.correo ,
      FO_rol : items.FO_rol ,
      caja : items.caja
    }
    this.id_preservado = id ;
  }

  busqueda(dato: any): void{
    if(dato != 0 || dato != ""){
      this.suser.filtro(dato).subscribe((resultado: any) =>
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
          text: "¡Este registro de usuario ha sido eliminado!",
          icon: "success"
        });
        this.suser.eliminar(id).subscribe((datos: any) => 
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