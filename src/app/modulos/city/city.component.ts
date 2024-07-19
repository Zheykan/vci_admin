import { Component } from '@angular/core';
import { CiudadService } from '../../servicios/ciudad.service';
import Swal from 'sweetalert2';
import { DepartamentoService } from '../../servicios/departamento.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrl: './city.component.scss'
})
export class CityComponent {

  ciudad: any ;
  obj_ciudad = {
    id_ciudad : 0 ,
    nombre : "" ,
    FO_departamento : 0
  }
  departamento: any ;
  id_preservado: any ;

  validate_c_nombre = true ;
  validate_c_dep = true ;
  most_edit = false ;

  constructor(private scity: CiudadService, private sdept: DepartamentoService){}
  ngOnInit(): void{
    this.consulta() ;
    this.consulta_d() ;
  }

  consulta(){
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

  limpiar(){
    this.obj_ciudad = {
      id_ciudad : 0 ,
      nombre : "" ,
      FO_departamento : 0
    }
  }

  validar_info(){
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
      this.editar_c() ;
    }
  }

  editar_c(){
    this.scity.editar(this.id_preservado,this.obj_ciudad).subscribe((datos: any) => 
    {
      if(datos['resultado'] == 'OK'){
        this.consulta();
      }
    }) ;
  }

  precarga_form(items: any, id: number){
    this.obj_ciudad = {
      id_ciudad : items.id_ciudad ,
      nombre : items.nombre ,
      FO_departamento : items.FO_departamento
    }
    this.id_preservado = id ;
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
          text: "¡Este registro de ciudad ha sido eliminado!",
          icon: "success"
        });
        this.scity.eliminar(id).subscribe((datos: any) => {
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
