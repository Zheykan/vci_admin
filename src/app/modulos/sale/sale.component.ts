import { Component } from '@angular/core';
import { VentaService } from '../../servicios/venta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.scss'
})
export class SaleComponent {

  venta: any ;
  dato: any ;
  obtenido: any;
  FO_rol: any ;
  rol : any ;

  constructor(private ssale: VentaService){}
  ngOnInit(): void{
    this.consulta() ;
    this.FO_rol = sessionStorage.getItem("FO_rol") ;
    this.rol = sessionStorage.getItem("rol") ;
    this.busqueda(this.dato) ;
  }

  consulta(){
    this.ssale.consultar().subscribe((resultado: any) =>
    {this.venta = resultado ;}
    )
  }

  busqueda(dato: any): void{
    if(dato != 0 || dato != ""){
      this.ssale.filtro(dato).subscribe((resultado: any) =>
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
          text: "¡Este registro de venta ha sido eliminado!",
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

    this.ssale.eliminar(id).subscribe((datos: any) => 
    {
      if(datos['resultado'] == 'OK'){
        this.consulta() ;
      }
    }) ;
  }
}
