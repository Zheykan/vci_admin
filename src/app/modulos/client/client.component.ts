import { Component } from '@angular/core';
import { ClienteService } from '../../servicios/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})

export class ClientComponent {

  cliente: any ;
  obj_cliente = {
    id_cliente : 0 ,
    nombre_apellido : "" ,
    telefono: "" ,
    correo: "" ,
    domicilio: ""
  }
  id_preservado: any ;
  dato: any ;
  obtenido: any;
  FO_rol: any ;
  rol : any ;

  validate_ced = true ;
  validate_name = true ;
  validate_tel = true ;
  validate_mail = true ;
  validate_dir = true ;
  most_edit = false ;
  
  constructor(private sclient: ClienteService){}
  ngOnInit(): void{
    this.consulta() ;
    this.FO_rol = sessionStorage.getItem("FO_rol") ;
    this.rol = sessionStorage.getItem("rol") ;
    this.busqueda(this.dato) ;
  }

  consulta(){
    this.sclient.consultar().subscribe((resultado: any) =>
    {this.cliente = resultado ;})
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

  limpiar(){
    this.obj_cliente = {
      id_cliente : 0 ,
      nombre_apellido : "" ,
      telefono: "" ,
      correo: "" ,
      domicilio: ""
    }
  }

  validar_info(){
    if(this.obj_cliente.id_cliente == 0 || this.obj_cliente.id_cliente == null){
      this.validate_ced = false ;
    }else{
      this.validate_ced = true ;
    }
    if(this.obj_cliente.nombre_apellido == ""){
      this.validate_name = false ;
    }else{
      this.validate_name = true ;
    }
    if(this.obj_cliente.telefono == ""){
      this.validate_tel = false ;
    }else{
      this.validate_tel = true ;
    }
    if(this.obj_cliente.correo == ""){
      this.validate_mail = false ;
    }else{
      this.validate_mail = true ;
    }
    if(this.obj_cliente.domicilio == ""){
      this.validate_dir = false ;
    }else{
      this.validate_dir = true ;
    }
    if(this.validate_ced == true && this.validate_name == true &&
      this.validate_tel == true && this.validate_mail == true && 
      this.validate_dir == true){
      this.editar_c() ;
    }
  }

  editar_c(){
    this.sclient.editar(this.id_preservado,this.obj_cliente).subscribe((datos: any) =>
    {
      if (datos['resultado'] == 'OK'){
        this.consulta() ;
      }
    }) ;
  }

  precarga_form(items: any, id: number){
    this.obj_cliente = {
      id_cliente : items.id_cliente ,
      nombre_apellido : items.nombre_apellido ,
      telefono: items.telefono ,
      correo: items.correo ,
      domicilio: items.domicilio
    }
    this.id_preservado = id ;
  }

  busqueda(dato: any): void{
    if(dato != 0 || dato != ""){
      this.sclient.filtro(dato).subscribe((resultado: any) =>
      {this.obtenido = resultado ;
      }) ;
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
          text: "¡Este registro de cliente ha sido eliminado!",
          icon: "success"
        });
        this.sclient.eliminar(id).subscribe((datos: any) => 
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
