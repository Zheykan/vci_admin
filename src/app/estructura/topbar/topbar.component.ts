import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {

  nombre: any ;
  correo: any ;
  FO_rol : any ;
  rol: any ;
  caja : any ;

  constructor(private srouter: Router){}

  ngOnInit(): void{
    this.nombre = sessionStorage.getItem("nombre") ;
    this.FO_rol = sessionStorage.getItem("FO_rol") ;
    this.rol = sessionStorage.getItem("rol") ;
    this.correo = sessionStorage.getItem("correo") ;
    this.caja = sessionStorage.getItem("caja") ;
  }

  session_end(){
    sessionStorage.setItem("id","") ;
    sessionStorage.setItem("email","") ;
    sessionStorage.setItem("nombre","") ;
    sessionStorage.setItem("FO_rol","") ;
    sessionStorage.setItem("rol","") ;
    sessionStorage.setItem("caja","") ;
    this.srouter.navigate(['login']) ;
  }
}