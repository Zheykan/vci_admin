import { Component } from '@angular/core';
import { MarcaService } from '../../servicios/marca.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mark',
  templateUrl: './mark.component.html',
  styleUrl: './mark.component.scss'
})
export class MarkComponent {

  marca: any ;
  obj_marca = {
    id_marca : 0 ,
    nombre : ""
  }
  id_preservado: any ;

  validate_m_name = true ;
  most_edit = false ;

  constructor(private smark: MarcaService){}
  ngOnInit(): void{
    this.consulta() ;
  }

  consulta(){
    this.smark.consultar().subscribe((resultado: any) =>
    {this.marca = resultado ;})
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
    this.obj_marca = {
      id_marca : 0 ,
      nombre : ""
    }
  }

  precarga_form(items: any, id: number){
    this.obj_marca = {
      id_marca : items.id_marca ,
      nombre : items.nombre
    }
    this.id_preservado = id ;
  }

  validar_info(){
    if(this.obj_marca.nombre == ""){
      this.validate_m_name = false ;
    }else{
      this.validate_m_name = true ;
    }
    if(this.validate_m_name == true){
      this.editar_m() ;
    }
  }

  editar_m(){
    this.smark.editar(this.id_preservado,this.obj_marca).subscribe((datos: any) =>
    {
      if (datos['resultado'] == 'OK'){
        this.consulta() ;
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
          text: "¡Este registro de marca ha sido eliminado!",
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

    this.smark.eliminar(id).subscribe((datos: any) => 
    {
      if(datos['resultado'] == 'OK'){
        this.consulta() ;
      }
    }) ;
  }
}
