import { Component } from '@angular/core';
import { VentaService } from '../../servicios/venta.service';
import Swal from 'sweetalert2';
import { DevolucionService } from '../../servicios/devolucion.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.scss'
})
export class SaleComponent {

  venta: any ;
  dato: any ;
  obtenido: any ;
  id_venta: any ;
  lista_prd: any ;
  subtotal = 0 ;
  iva = 0.16 ;
  impuestos = 0 ;
  total: any ;
  id_temp = 0 ;
  FO_rol: any ;
  rol : any ;
  mensaje: any = [] ;

  most_info = false ;
  most_busq = false ;
  most_mess = false ;
  most_dev = false ;

  constructor(private ssale: VentaService, private sdev: DevolucionService){}
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
    this.ssale.expand(id).subscribe((resultado: any) =>
    {this.lista_prd = resultado ;}
    )
    this.id_venta = items.id_venta ;    
    this.total = items.total ;
    this.impuestos = this.total * this.iva ;
    this.subtotal = this.total - this.impuestos ;
  }

  precarga_dev(items: any, id: number){
    this.sdev.expand(id).subscribe((resultado: any) => {
      this.lista_prd = resultado ;
    })    
    this.total = Number(items[0][5]) ;
    this.impuestos = this.total * this.iva ;
    this.subtotal = this.total - this.impuestos ;
  }

  busqueda(dato: any): void{
    if(dato != 0 || dato != ""){
      this.ssale.filtro(dato).subscribe((resultado: any) => {
        if(resultado ){this.obtenido = resultado ;}
        
      })
    }else{
      this.most_busq = false ;
    }
  }

  busqueda_dev(dato: any): void{
    if(dato != 0 || dato != ""){
      this.id_temp = Number(dato) ;
      this.sdev.filtro(dato).subscribe((resultado: any) => {
        this.obtenido = resultado ;
        if (typeof this.obtenido[0] === 'undefined') {
          this.most_mess = true ;
          this.most_dev = false ;
          this.mensaje = 'La factura N° '+dato+' no tiene ninguna devolución relacionada.'
        }else{
          this.precarga_dev(this.obtenido, Number(this.obtenido[0][0])) ;
          this.most_busq = false ;
          this.most_mess = false ;
          this.most_dev = true ;
        }
      })
    }else{
      this.most_busq = false ;
      this.most_dev = false ;
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
        this.ssale.eliminar(id).subscribe((datos: any) => {
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
