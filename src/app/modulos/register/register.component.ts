import { Component } from '@angular/core';
import { RolService } from '../../servicios/rol.service';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  usuario: any ;
  obj_usuario = {
    nombre : "" ,
    contrasenia : "" ,
    telefono : "" ,
    correo : "" ,
    FO_rol : 0 ,
    caja : 0 
  }
  rol: any ;

  validate_name = true ;
  validate_pass = true ;
  validate_tel = true ;
  validate_email = true ;
  validate_rol = true ;
  validate_box = true ;

  constructor(private suser: UsuarioService, private srole: RolService){}
  ngOnInit(): void{
    this.consulta() ;
    this.consulta_r() ;
  }
  consulta(){
    this.suser.consultar().subscribe((resultado: any) =>
    {this.usuario = resultado ;})
  }
  consulta_r(){
    this.srole.consultar().subscribe((resultado: any) =>
    {this.rol = resultado ;})
  }

  validar_info(){
    if(this.obj_usuario.nombre == ""){
      this.validate_name = false ;
    }else{
      this.validate_name = true ;
    }
    if(this.obj_usuario.contrasenia == ""){
      this.validate_pass = false ;
    }else{
      this.validate_pass = true ;
    }
    if(this.obj_usuario.telefono == ""){
      this.validate_tel = false ;
    }else{
      this.validate_tel = true ;
    }
    if(this.obj_usuario.correo == ""){
      this.validate_email = false ;
    }else{
      this.validate_email = true ;
    }
    if(this.obj_usuario.FO_rol == 0){
      this.validate_rol = false ;
    }else{
      this.validate_rol = true ;
    }
    if(this.validate_name == true && this.validate_pass == true && 
      this.validate_tel == true && this.validate_email == true && 
      this.validate_rol == true){
        this.registrar_u() ;
    }
  }

  registrar_u(){
    this.suser.insertar(this.obj_usuario).subscribe((datos: any) =>
    {
      if(datos['resultado'] == 'OK'){
        this.consulta();
      }
    }) ;
  }
}
