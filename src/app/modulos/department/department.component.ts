import { Component } from '@angular/core';
import { DepartamentoService } from '../../servicios/departamento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrl: './department.component.scss'
})
export class DepartmentComponent {

  departamento: any ;
  constructor(private sdepartment: DepartamentoService){}
  ngOnInit(): void{
    this.consulta() ;
  }

  consulta(){
    this.sdepartment.consultar().subscribe((resultado: any) => 
    {this.departamento = resultado ;})
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
          text: "¡Este registro de departamento ha sido eliminado!",
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

    this.sdepartment.eliminar(id).subscribe((datos: any) => 
    {
      if(datos['resultado'] == 'OK'){
        this.consulta() ;
      }
    }) ;
  }
}
