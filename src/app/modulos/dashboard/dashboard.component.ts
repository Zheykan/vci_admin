import { Component } from '@angular/core';
import { CompraService } from '../../servicios/compra.service';
import { UsuarioService } from '../../servicios/usuario.service';
import { VentaService } from '../../servicios/venta.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  total_ventas = 0 ;
  last_v = 0 ;
  last_c = 0 ;
  last_date_c = "" ;
  conteo = 0 ;
  conteo_v = 0 ;
  conteo_b = 0 ;
  conteo_s = 0 ;
  conteo_a = 0 ;
  FO_rol: any ;
  rol : any ;
  
  constructor(private ssale: VentaService, private suser: UsuarioService,
    private scompra: CompraService){}

  ngOnInit(): void{
    this.consulta_t() ;
    this.consulta_fac() ;
    this.consulta_prch() ;
    this.consulta_cnt() ;
    this.consulta_employee();
    this.FO_rol = sessionStorage.getItem("FO_rol") ;
    this.rol = sessionStorage.getItem("rol") ;
  }

  consulta_t(){
    this.ssale.total().subscribe((resultado: any) => {
      this.total_ventas = resultado[0][0] ;
    }) ;
  }

  consulta_fac(){
    this.ssale.maximo().subscribe((resultado: any) => {
      this.last_v = resultado[0][0] ;
    }) ;
  }

  consulta_cnt(){
    this.ssale.conteo().subscribe((resultado: any) => {
      this.conteo = resultado[0][0] ;
    }) ;
  }

  consulta_prch(){
    this.scompra.maximo().subscribe((resultado: any) => {
      this.last_c = resultado[0][0] ;
      this.last_date_c = resultado[0][2] ;
    })
  }

  consulta_employee(){
    this.suser.conteo().subscribe((resultado: any) => { 
      this.conteo_v = resultado[0][0][0] ;
      this.conteo_b = resultado[1][0][0] ;
      this.conteo_a = resultado[2][0][0] ;
      this.conteo_s = resultado[3][0][0] ;
    }) ;
  }
}
