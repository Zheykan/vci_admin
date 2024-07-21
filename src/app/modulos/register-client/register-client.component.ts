import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from '../../servicios/cliente.service';

@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.component.html',
  styleUrl: './register-client.component.scss'
})
export class RegisterClientComponent {

  cliente: any ;
  obj_cliente = {
    id_cliente : 0 ,
    nombre_apellido : "" ,
    telefono: "" ,
    correo: "" ,
    domicilio: ""
  }

  validate_ced = true ;
  validate_name = true ;
  validate_tel = true ;
  validate_mail = true ;
  validate_dir = true ;

  constructor(private sclient: ClienteService, private srouter: Router){}
  ngOnInit(): void{
    this.consulta() ;
  }
  consulta(){
    this.sclient.consultar().subscribe((resultado: any) =>
    {this.cliente = resultado ;})
  }

  validar_info(){
    if(this.obj_cliente.id_cliente == 0){
      this.validate_ced = false ;
    }else{
      this.validate_ced = true ;
    }
    if(this.obj_cliente.nombre_apellido == "" || this.obj_cliente.nombre_apellido == null){
      this.validate_name = false ;
    }else{
      this.validate_name = true ;
    }
    if(this.obj_cliente.telefono == "" || this.obj_cliente.telefono == null){
      this.validate_tel = false ;
    }else{
      this.validate_tel = true ;
    }
    if(this.obj_cliente.correo == "" || this.obj_cliente.correo == null){
      this.validate_mail = false ;
    }else{
      this.validate_mail = true ;
    }
    if(this.obj_cliente.domicilio == "" || this.obj_cliente.domicilio == null){
      this.validate_dir = false ;
    }else{
      this.validate_dir = true ;
    }
    if(this.validate_ced == true && this.validate_name == true &&
      this.validate_tel == true && this.validate_mail == true && 
      this.validate_dir == true){
      this.registrar_c() ;
      this.limpiar() ;
      this.srouter.navigate(['client']) ;
    }
  }

  limpiar(){
    this.obj_cliente = {
      id_cliente : 0 ,
      nombre_apellido : "" ,
      telefono: "" ,
      correo: "" ,
      domicilio: ""
    }
  }

  registrar_c(){
    this.sclient.insertar(this.obj_cliente).subscribe((datos: any) =>
    {
      if (datos['resultado'] == 'OK'){
        this.consulta() ;
      }
    }) ;
  }
}
