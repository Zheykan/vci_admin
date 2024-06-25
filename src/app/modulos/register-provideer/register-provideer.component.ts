import { Component } from '@angular/core';
import { CiudadService } from '../../servicios/ciudad.service';
import { ProveedorService } from '../../servicios/proveedor.service';

@Component({
  selector: 'app-register-provideer',
  templateUrl: './register-provideer.component.html',
  styleUrl: './register-provideer.component.scss'
})
export class RegisterProvideerComponent {

  proveedor: any ;
  obj_proveedor = {
    id_proveedor_nit : 0 ,
    razon_social : "" ,
    contacto : "" ,
    telefono : "" ,
    correo : "" ,
    direccion: "" ,
    FO_ciudad : 0
  }
  ciudad: any ;

  validate_nit = true ;
  validate_razon = true ;
  validate_cont = true ;
  validate_tel = true ;
  validate_mail = true ;
  validate_dir = true ;
  validate_city = true ;

  constructor(private sprovider: ProveedorService, private scity: CiudadService){}
  ngOnInit(): void{
    this.consulta() ;
    this.consulta_c() ;
  }

  consulta(){
    this.sprovider.consultar().subscribe((resultado: any) => 
    {this.proveedor = resultado ;})
  }
  consulta_c(){
    this.scity.consultar().subscribe((resultado: any) => 
    {this.ciudad = resultado ;})
  }

  validar_info(){
    if(this.obj_proveedor.id_proveedor_nit == 0){
      this.validate_nit = false ;
    }else{
      this.validate_nit = true ;
    }
    if(this.obj_proveedor.razon_social == ""){
      this.validate_razon = false ;
    }else{
      this.validate_razon = true ;
    }
    if(this.obj_proveedor.contacto == ""){
      this.validate_cont = false ;
    }else{
      this.validate_cont = true ;
    }
    if(this.obj_proveedor.telefono == ""){
      this.validate_tel = false ;
    }else{
      this.validate_tel = true ;
    }
    if(this.obj_proveedor.correo == ""){
      this.validate_mail = false ;
    }else{
      this.validate_mail = true ;
    }
    if(this.obj_proveedor.direccion == ""){
      this.validate_dir = false ;
    }else{
      this.validate_dir = true ;
    }
    if(this.obj_proveedor.FO_ciudad == 0){
      this.validate_city = false ;
    }else{
      this.validate_city = true ;
    }
    if (this.validate_nit == true && this.validate_razon == true && 
      this.validate_cont == true && this.validate_tel == true && 
      this.validate_mail == true && this.validate_dir == true && 
      this.validate_city == true) {
        this.registrar_pv() ;
    }
  }

  registrar_pv(){
    this.sprovider.insertar(this.obj_proveedor).subscribe((datos: any) => 
    {
      if (datos['resultado'] == 'OK') {
        this.consulta() ;
      }
    }) ;
  }
}
