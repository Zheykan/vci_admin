import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../servicios/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  email: any ;
  passwd: any ;
  log_error = true ;
  user: any ;
  log_user = {
    id_usuario : 0 ,
    contrasenia : "" ,
    nombre: "" ,
    telefono: "" ,
    correo: "" ,
    FO_rol : 0 ,
    caja : 0
  }
  
  constructor(private slogin: LoginService, private srouter: Router){}
  ngOnInit(): void{
    sessionStorage.setItem("id","") ;
    sessionStorage.setItem("email","") ;
    sessionStorage.setItem("nombre","") ;
    sessionStorage.setItem("FO_rol","") ;
    sessionStorage.setItem("rol","") ;
    sessionStorage.setItem("caja","") ;
  }

  consulta(){
    
      this.slogin.consulta(this.email, this.passwd).subscribe((resultado : any) =>
      { this.user = resultado;
        if(this.user[0].access == "granted"){
          sessionStorage.setItem("id",this.user[0]['id_usuario']) ;
          sessionStorage.setItem("email",this.user[0]['correo']) ;
          sessionStorage.setItem("nombre",this.user[0]['nombre']) ;
          sessionStorage.setItem("FO_rol",this.user[0]['FO_rol']) ;
          sessionStorage.setItem("rol",this.user[0]['rol']) ;
          sessionStorage.setItem("caja",this.user[0]['caja']) ;
          this.srouter.navigate(['dashboard']) ;
          this.recarga() ;
          //for (let cont = 0; cont < 1; cont++) {
            //parent.window.location.reload();
          //}
        }else {
          console.log("Acceso denegado!") ;
          this.log_error = false ;
        }})
  }

  recarga () {
    // modificando la direccion de la localizacion refresca y redirige a la seccion indicada
    window.location.href  = "http://localhost:4200/dashboard";
    setInterval("location.reload()",200);
}
}
