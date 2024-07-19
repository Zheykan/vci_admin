import { Component } from '@angular/core';
import { UnidadService } from '../../servicios/unidad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-unity',
  templateUrl: './unity.component.html',
  styleUrl: './unity.component.scss'
})
export class UnityComponent {

  unidad: any ;
  obj_unidad = {
    id_unidad : 0 ,
    nombre : ""
  }
  id_preservado: any ;
  dato: any ;

  validate_name = true ;
  most_edit = false ;

  constructor(private sunid: UnidadService){}
  ngOnInit(): void{
    this.consulta() ;
  }

  consulta(){
    this.sunid.consultar().subscribe((resultado: any) =>
    {this.unidad = resultado ;}
    )
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
    this.obj_unidad = {
    id_unidad : 0 ,
    nombre : ""
  }
  }

  precarga_form(items: any, id: number){
    this.obj_unidad = {
    id_unidad : items.id_unidad ,
    nombre : items.nombre
  }
    this.id_preservado = id ;
  }

  validar_info(){
    if(this.obj_unidad.nombre == ""){
      this.validate_name = false ;
    }else{
      this.validate_name = true ;
    }
    if(this.validate_name == true){
      this.editar_u() ;
    }
  }
  editar_u(){
    this.sunid.editar(this.id_preservado,this.obj_unidad).subscribe((datos: any) =>
    {
      if(datos['resultado'] == 'OK'){
        this.consulta();
      }
    }) ;
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
          text: "¡Este registro de unidad ha sido eliminado!",
          icon: "success"
        });
        this.sunid.eliminar(id).subscribe((datos: any) => {
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
