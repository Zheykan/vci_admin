import { Component } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  usuario: any ;
  obj_usuario = {
    nombre : "" ,
    contrasenia : "" ,
    telefono : "" ,
    correo : "" ,
    FO_rol : 0 ,
    caja : 0
  }
  id_preservado: any ;
  dato = '' ;
  pass = '' ;
  obtenido: any ;
  mensaje : any = [] ;

  validate_name = true ;
  validate_pass = true ;
  validate_tel = true ;
  validate_email = true ;
  validate_rol = true ;
  validate_box = true ;
  confirm = true ;
  most_mess = false ;
  most_chg = false ;

  constructor(private suser: UsuarioService){}

  consulta(){
    this.suser.consultar().subscribe((resultado: any) => {
      this.usuario = resultado ;
      //console.log(this.usuario) ;
  }) ;
  }

  mostrar_edit(dato: any){
    switch(dato){
      case "mostrar":
        this.most_chg = true ;
      break ;
      case "ocultar":
        this.most_chg = false ;
      break ;
    }
    this.limpiar() ;
  }

  limpiar(){
    this.obj_usuario = {
      nombre : "" ,
      contrasenia : "" ,
      telefono : "" ,
      correo : "" ,
      FO_rol : 0 ,
      caja : 0
    }
    this.dato = ''
  }

  validar_info(){
    this.obj_usuario.contrasenia = this.pass ;
    if(this.obj_usuario.nombre == "" || this.obj_usuario.nombre == null){
      this.validate_name = false ;
    }else{
      this.validate_name = true ;
    }
    if(this.obj_usuario.contrasenia == "" || this.obj_usuario.contrasenia == null){
      this.validate_pass = false ;
    }else{
      this.validate_pass = true ;
    }
    if(this.obj_usuario.telefono == "" || this.obj_usuario.telefono == null){
      this.validate_tel = false ;
    }else{
      this.validate_tel = true ;
    }
    if(this.obj_usuario.correo == "" || this.obj_usuario.correo == null){
      this.validate_email = false ;
    }else{
      this.validate_email = true ;
    }
    if(this.obj_usuario.FO_rol == 0 || this.obj_usuario.FO_rol == null){
      this.validate_rol = false ;
    }else{
      this.validate_rol = true ;
    }
    if(this.validate_name == true && this.validate_pass == true && 
      this.validate_tel == true && this.validate_email == true && 
      this.validate_rol == true){
        this.editar_u() ;
        this.confirm = false ;
    }
  }

  editar_u(){
    this.suser.editar(this.id_preservado,this.obj_usuario).subscribe((datos: any) =>
    {
      if (datos['resultado'] == 'OK'){
        this.consulta() ;
      }
    }) ;
  }

  busqueda(dato: any): void{
    dato = dato.toString() ;
    if(typeof dato === 'string' && dato.length === 0 || dato.trim().length === 0 || dato.length < 9){
      this.most_mess = true ;
      this.mensaje = 'Debes ingresar al menos un correo valido.'
    }
    else{
      this.suser.restore(dato).subscribe((resultado: any) => {
        this.obtenido = resultado ;
        if (typeof this.obtenido === 'undefined' || this.obtenido.length === 0 || this.obtenido == '') {
          this.most_mess = true ;
          this.most_chg = false ;
          this.mensaje = 'El correo ingresado no es valido.'
        }
        else{
          this.most_chg = true ;
          this.id_preservado = this.obtenido[0][0] ;
          this.obj_usuario.nombre = this.obtenido[0][1] ;
          this.obj_usuario.telefono = this.obtenido[0][3] ;
          this.obj_usuario.correo = this.obtenido[0][4] ;
          this.obj_usuario.FO_rol = this.obtenido[0][5] ;
          this.obj_usuario.caja = this.obtenido[0][6] ;
        }
      }) ;
    }
    
  }
}
