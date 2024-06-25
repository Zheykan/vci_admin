import { Component } from '@angular/core';
import { CompraService } from '../../servicios/compra.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrl: './purchase.component.scss'
})
export class PurchaseComponent {

  compra: any ;
  dato: any ;
  obtenido: any;
  constructor(private scompra: CompraService){}
  ngOnInit(): void{
    this.consulta() ;
    this.busqueda(this.dato) ;
  }

  consulta(){
    this.scompra.consultar().subscribe((resultado: any) =>
    {this.compra = resultado ;}
    )
  }

  busqueda(dato: any): void{
    if(dato != 0 || dato != ""){
      this.scompra.filtro(dato).subscribe((resultado: any) =>
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
          text: "¡Este registro de orden ha sido eliminado!",
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

    this.scompra.eliminar(id).subscribe((datos: any) => 
    {
      if(datos['resultado'] == 'OK'){
        this.consulta() ;
      }
    }) ;
  }
}
