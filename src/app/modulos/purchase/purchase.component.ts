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
  obtenido: any ;
  id_compra: any ;
  lista_prd: any ;
  subtotal = 0 ;
  iva = 0.16 ;
  impuestos = 0 ;
  total: any ;
  FO_rol : any ;
  most_info = false ;
  most_busq = false ;

  constructor(private scompra: CompraService){}
  ngOnInit(): void{
    this.consulta() ;
    this.FO_rol = sessionStorage.getItem("FO_rol") ;
    this.busqueda(this.dato) ;
  }

  consulta(){
    this.scompra.consultar().subscribe((resultado: any) =>
    {this.compra = resultado ;}
    )
  }

  mostrar_info(dato: any){
    switch(dato){
      case "mostrar":
        this.most_info = true ;
      break ;
      case "ocultar":
        this.most_info = false ;
      break ;
    }
    this.dato = "" ;
  }

  mostrar_busq(dato: any){
    switch(dato){
      case "mostrar":
        this.most_busq = true ;
      break ;
      case "ocultar":
        this.most_busq = false ;
      break ;
    }
    this.dato = "" ;
  }

  precarga_form(items: any, id: number){
    this.scompra.expand(id).subscribe((resultado: any) =>
    {this.lista_prd = resultado ;}
    )
    console.log(this.lista_prd);
    this.id_compra = items.id_compra ;    
    this.total = items.total ;
    this.impuestos = this.total * this.iva ;
    this.subtotal = this.total - this.impuestos ;
  }

  busqueda(dato: any): void{
    if(dato != 0 || dato != ""){
      this.scompra.filtro(dato).subscribe((resultado: any) =>
      {this.obtenido = resultado ;
      })
    }
    else{
      this.most_busq = false ;
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
        this.scompra.eliminar(id).subscribe((datos: any) => {
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
