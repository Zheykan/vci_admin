import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {

  FO_rol: any ;
  rol : any ;
  caja : any ;

  ngOnInit(): void{
    this.FO_rol = sessionStorage.getItem("FO_rol") ;
    this.rol = sessionStorage.getItem("rol") ;
    if(this.caja = sessionStorage.getItem("caja") == "0"){
      this.caja = "" ;
    }else{
      this.caja = sessionStorage.getItem("caja")
    };
  }
}
