import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from '../../servicios/cliente.service';
import { ProductoService } from '../../servicios/producto.service';
import { VentaService } from '../../servicios/venta.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-register-sale',
  templateUrl: './register-sale.component.html',
  styleUrl: './register-sale.component.scss'
})
export class RegisterSaleComponent {

  venta: any ;
  obj_venta = {
    id_venta : 0 ,
    fecha : "01/12/2099" ,
    FO_usuario_vendedor : 0 ,
    FO_cliente : 0 ,
    productos_venta : [] ,
    total : 0
  }
  obj_producto = {
    id_producto : 0 ,
    cantidad_producto : 0
  }
  lista_venta: any = [] ;
  detail_p: any = [] ;
  articulos = 0 ;
  stock_g = 0 ;
  stock_p = 0 ;
  subtotal = 0 ;
  iva = 0.16 ;
  impuestos = 0 ;
  total_v = 0 ;
  productos: any ;
  maximo : any ;
  new_cant: any = [] ;
  vendedor_n: any ;
  cliente: any ;
  dato: any ;
  obtenido: any ;
  valor = 0 ;
  id_user: any ;
  FO_rol: any ;
  rol: any ;
  caja : any ;

  validate_fac = true ;
  validate_date = true ;
  validate_vend = true ;
  validate_cli = true ;
  validate_list = true ;
  validate_cant = true ;
  validate_subt = true ;
  validate_t = true ;
  most_busq = false ;
  most_stock = false ;

  constructor(private ssale: VentaService, private sclient: ClienteService,
  private sproduct: ProductoService, private srouter: Router){}
  
  ngOnInit(): void{
    this.consulta() ;
    this.consulta_c() ;
    this.consulta_prd() ;
    this.consulta_mx() ;
    this.obj_venta.FO_usuario_vendedor = Number(sessionStorage.getItem("id")) ;
    this.vendedor_n = sessionStorage.getItem("nombre") ;
    this.FO_rol = sessionStorage.getItem("FO_rol") ;
    this.rol = sessionStorage.getItem("rol") ;
    this.caja = sessionStorage.getItem("caja") ;
    this.busqueda(this.dato) ;
  }

  consulta(){
    this.ssale.consultar().subscribe((resultado: any) => {
      this.venta = resultado ;})
  }
  consulta_c(){
    this.sclient.consultar().subscribe((resultado: any) => {
      this.cliente = resultado ;})
  }
  consulta_prd(){
    this.sproduct.consultar().subscribe((resultado: any) => {
      this.productos = resultado ;})
  }

  consulta_mx(){
    this.ssale.maximo().subscribe((resultado: any) => {
      this.maximo = Number(resultado[0][0])
    }) ;
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

  mostrar_stock(dato: any){
    switch(dato){
      case "mostrar":
        this.most_stock = true ;
      break ;
      case "ocultar":
        this.most_stock = false ;
      break ;
    }
  }

  limpiar(){
    this.obj_venta = {
      id_venta : 0 ,
      fecha : "" ,
      FO_usuario_vendedor : 0 ,
      FO_cliente : 0 ,
      productos_venta : [] ,
      total : 0
    }
    this.detail_p = [] ;
    this.lista_venta = [] ;
    this.subtotal = 0 ;
    this.impuestos = 0 ;
    this.total_v = 0 ;
    this.dato = "" ;
  }

  validar_info(){
    if(this.obj_venta.id_venta == 0){
      this.validate_fac = false ;
    }else{
      this.validate_fac = true ;
    }
    if(this.obj_venta.fecha == "" || this.obj_venta.fecha == null){
      this.validate_date = false ;
    }else{
      this.validate_date = true ;
    }
    if(this.obj_venta.FO_usuario_vendedor == 0){
      this.validate_vend = false ;
    }else{
      this.validate_vend = true ;
    }
    if(this.obj_venta.FO_cliente == 0){
      this.validate_cli = false ;
    }else{
      this.validate_cli = true ;
    }
    if(this.obj_venta.total == 0){
      this.validate_t = false ;
    }else{
      this.validate_t = true ;
    }
    if (this.validate_fac == true && this.validate_date == true && 
      this.validate_vend == true && this.validate_cli == true && 
      this.validate_t == true) {
        this.registrar_sl() ;
        let size = this.new_cant.length;
        for (let index = 0; index < size; index++){
          this.obj_producto = {
            id_producto : this.new_cant[index][0] ,
            cantidad_producto : this.new_cant[index][1]
          }
          this.stock_save() ;
        }
        this.limpiar() ;
        this.most_busq = false ;
        this.srouter.navigate(['register-sale']) ;
    }
  }

  validar_cnt(){
    this.stock_g = Number(this.detail_p.cantidad_producto);
    if(this.stock_p == 0 || this.stock_p > this.stock_g){
      this.validate_cant = false ;
    }else{
      this.validate_cant = true ;
    }
    if (this.validate_cant == true){
      this.seleccionar_prd(this.detail_p);
    }
    this.stock_p = 0 ;
  }

  seleccionar_prd(valores: any){
    let articulos = 0 ;
    articulos = articulos + this.stock_p ;
    //let cant_ing = Number(prompt("Cantidad requerida (no debe ser mayor a "+valores.cantidad_producto+"):")) ;
    // cargamos la matriz para actualizar la lista de venta en base de datos
    let detail_p = [valores.id_producto, valores.nombre+" "+valores.medida+" "+valores.unidad_med+" "+valores.marca,
    this.stock_p, Number(valores.precio_venta), this.stock_p * Number(valores.precio_venta)] ;
    // corroborar el almacenaje de la descripcion del producto dentro de la matriz
    this.lista_venta.push(detail_p) ;
    // console.log(this.lista_venta) ;
    // cargamos la matriz para actualizar cantidades en base de datos
    this.stock_g = this.stock_g - this.stock_p ;
    detail_p = [valores.id_producto, this.stock_g];
    this.new_cant.push(detail_p) ;
    // calculamos el total segun los precios almacenados en la mareiz
    let size = this.lista_venta.length;
    this.total_v = 0 ;
    for (let index = 0; index < size; index++) {
      this.total_v += this.lista_venta[index][4] ;
      //console.log(this.total_v) ;
    }
    this.articulos = this.articulos + articulos;
    this.impuestos = this.total_v * this.iva ;
    this.subtotal = this.total_v - this.impuestos ;
    this.obj_venta.productos_venta = this.lista_venta ;
    this.obj_venta.total = this.total_v ;
    //console.log(this.obj_venta) ;
    console.log(this.articulos) ;
  }

  stock_save(){
    this.sproduct.stock(this.obj_producto.id_producto,this.obj_producto).subscribe((datos: any) => {
      if (datos['resultado'] == 'OK'){
        this.consulta() ;}
    }) ;
  }

  quitar_prd(valores: any){
    let articulos = 0 ;
    let idnc = this.lista_venta.indexOf(valores) ;
    articulos = articulos + Number(this.lista_venta[idnc][2]) ;
    this.lista_venta.splice(idnc, 1) ;
    // corroborar la eliminación de la descripcion del producto dentro de la matriz
    //console.log(this.lista_venta) ;
    let size = this.lista_venta.length ;
    this.total_v = 0 ;
    for (let index = 0; index < size; index++) {
      this.total_v += this.lista_venta[index][4] ;
      //console.log(this.total_v) ;
    }
    this.articulos = this.articulos - articulos;
    this.impuestos = this.total_v * this.iva ;
    this.subtotal = this.total_v - this.impuestos ;
    this.obj_venta.productos_venta = this.lista_venta ;
    this.obj_venta.total = this.total_v ;
    //console.log(this.obj_venta) ;
    console.log(this.articulos) ;
  }

  registrar_sl(){
    //let fecha_t = new Date() ;
    //this.obj_venta.fecha = `${fecha_t.getFullYear()}-${fecha_t.getMonth()+1}-${fecha_t.getDate()}` ;
    this.ssale.insertar(this.obj_venta).subscribe((datos: any) => {
      if (datos['resultado'] == 'OK') {
        console.log(datos['resultado']) ;
        this.consulta() ;
      }
    }) ;
  }

  cantidad(item: any){
    this.valor = Number(item.cantidad_producto) ;
    this.detail_p = item ; 
    //console.log(this.detail_p) ;
  }

  busqueda(dato: any): void{
    if(dato != 0 || dato != ""){
      this.sproduct.filtro(dato).subscribe((resultado: any) => {
      this.obtenido = resultado ;
      })
    }
  }

  createPdf(){
    // funcion para dar formato moneda en el pdf
    function currencyFormatter({currency, value}) {
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        minimumFractionDigits: 2,
        currency
      }) 
      return formatter.format(value)
    }

    // formato moneda para total subtotal e impuestos
    let value = this.total_v ;
    let total_cur = currencyFormatter({currency: "USD",value}) ;
    value = this.impuestos ;
    let impuestos_cur = currencyFormatter({currency: "USD",value}) ;
    value = this.subtotal ;
    let subtotal_cur = currencyFormatter({currency: "USD",value}) ;

    // formato moneda para el precio y subtotal de los productos
    let items = this.lista_venta.map(function(item) {
      let value = Number(item[3]) ;
      let price = currencyFormatter({currency: "USD",value}) ;
      value = Number(item[4]) ;
      let subs = currencyFormatter({currency: "USD",value}) ;
      return [item[0],item[1],item[2],price,subs];
     });
    var pdfDefinition: any = {
        
      info: {
        title: 'Factura_'+this.obj_venta.fecha+'_'+this.obj_venta.id_venta+'.pdf',
        author: '"NOMBRE DEL NEGOCIO"',
      },

      footer: function(currentPage, pageCount){
        let dec = {text: 'SISTEMA P.O.S. VCI ADMIN - DESARROLLADO POR: TAO INGENIERIA - '+
        'NIT: ############'+'\n'+currentPage.toString() + ' of ' + pageCount, style: 'footer'};
        return dec;
      },
      
      content: [
      {text: '"Nombre del Negocio"', style: 'header'},
      {text: '"Tipo de negocio"', style: 'subheader'},
      {text: 'NIT #########', style: 'subheader'},
      {text: 'Dirección: ########', style: 'subheader'},
      {text: 'Teléfono: ########', style: 'subheader'},

      {
        style: 'datos_fStyle',
        table: {
          headerRows: 1,
          widths: [100, 100, '*'],
          body: [
            [{text: 'Cliente: '+this.obj_venta.FO_cliente, style: 'clienteStyle'},
            {text: 'Fecha: '+this.obj_venta.fecha, style: 'fechaStyle'},
            {text: ['Factura Electronica N°: ',{text:''+this.obj_venta.id_venta, style: 'facturaStyle'}], alignment: 'right'}],
          ]
        },
        layout: 'noBorders'
      },

      {
        style: 'dataTable',
        color: '#444',
        table: {
          widths: [40,220,50,70,70],
          headerRows: 1,
          // keepWithHeaderRows: 1,
          body: [
            [
            {text: 'Código', style: 'tableHeader', alignment: 'center'},{text: 'Producto', style: 'tableHeader', alignment: 'center'},
            {text: 'Cantidad', style: 'tableHeader', alignment: 'center'},{text: 'Precio Und', style: 'tableHeader', alignment: 'center'},
            {text: 'Precio Cnt', style: 'tableHeader', alignment: 'center'}],
            
          ].concat(items)
        },
        layout: {
          fillColor: function (rowIndex, node, columnIndex) {
            return (rowIndex === 0) ? '#cff4fc' : null;
          }
        }
      },

      {
        style: 'tableExample',
        color: '#444',
        table: {
          widths: [40,220,50,70,70],
          headerRows: 1,
          // keepWithHeaderRows: 1,
          body: [
            [
            {text: '', colSpan: 3, alignment: 'center'},{},
            {},{text: 'Subtotal', style: 'tableFooter', alignment: 'center'},
            {text: ''+subtotal_cur, style: 'tableFooter', alignment: 'right'}],
          ]
        },
        layout: {
          fillColor: function (rowIndex, node, columnIndex) {
            return (rowIndex === 0) ? '#d1e7dd' : null;
          }
        }
      },

      {
        style: 'tableExample',
        color: '#444',
        table: {
          widths: [40,220,50,70,70],
          headerRows: 1,
          // keepWithHeaderRows: 1,
          body: [
            [
            {text: '', colSpan: 3, alignment: 'center'},{},
            {},{text: 'IVA (16%)', style: 'tableFooter', alignment: 'center'},
            {text: ''+impuestos_cur, style: 'tableFooter', alignment: 'right'}],
          ]
        },
        layout: {
          fillColor: function (rowIndex, node, columnIndex) {
            return (rowIndex === 0) ? '#fff3cd' : null;
          }
        }
      },

      {
        style: 'tableExample',
        color: '#444',
        table: {
          widths: [40,220,50,70,70],
          headerRows: 1,
          // keepWithHeaderRows: 1,
          body: [
            [
            {text: '', colSpan: 3, alignment: 'center'},{},
            {},{text: 'TOTAL', style: 'tableFooter_t', alignment: 'center'},
            {text: ''+total_cur, style: 'tableFooter_t', alignment: 'right'}],
          ]
        },
        layout: {
          fillColor: function (rowIndex, node, columnIndex) {
            return (rowIndex === 0) ? '#000000' : null;
          }
        }
      },

      {
        style: 'datos_fStyle',
        table: {
          headerRows: 1,
          widths: [100, 100, '*'],
          body: [
            [{text: 'Cajero: '+this.vendedor_n, style: 'clienteStyle'},
            {text: 'Caja: '+this.caja, style: 'fechaStyle'},
            {text: 'Número de articulos entregados: '+this.articulos, style: 'fechaStyle'}],
          ]
        },
        layout: 'noBorders'
      },

      {text: ' ', style: 'space'},

      {text: 'RESOLUCIÓN DE FACTURA ELECTRONICA N° 18764067437719 DEL 2024-03-16'+
      '\nDESDE FACTURA N° 1 HASTA 200000 -\nVIGENCIA DESDE LA FECHA 2024-03-16 HASTA LA FECHA 2024-12-28.'+'\n'+
      '\n',
			style: 'small'},

      {text: 'BIENES EXENTOS - DECRETO 417 DEL 17 DE MARZO DE 2020',
			style: 'small'},

      {text: '¡GRACIAS POR SU COMPRA!',
			style: 'medium'}

      ], // final del content pdf

      // estilos para cada subclase del content pdf
      styles: {
        header: {
          fontSize: 22,
          bold: true,
          alignment: 'center',
          decoration: 'underline',
          margin: [10,5,10,20]
        },
        footer: {
          fontSize: 9,
          bold: true,
          alignment: 'center',
          margin: [60,0,60,25]
        },
        subheader: {
          fontSize: 11,
          alignment: 'center',
          margin: [10,0,10,5]
        },
        datos_fStyle: {
          margin: [10,15,10,15]
        },
        clienteStyle: {
          italics: true,
          alignment: 'left',
          margin: [10,10,10,0]
        },
        fechaStyle: {
          italics: true,
          alignment: 'left',
          margin: [10,10,10,0]
        },
        facturaStyle: {
          fontSize: 16,
          italics: true,
          bold: true,
          alignment: 'right',
          color: 'red',
          margin: [10,6,10,0]
        },
        dataTable:{
          alignment: 'center'
        },
        tableHeader:{
          fontSize: 12,
          bold: true,
          background : '#cff4fc',
        },
        tableFooter:{
          fontSize: 12,
          bold: true,
        },
        tableFooter_t:{
          fontSize: 12,
          bold: true,
          color: 'white'
        },
        small: {
          fontSize: 8 ,
          alignment: 'center',
          margin: [50,5,50,5]
        },
        medium: {
          fontSize: 10 ,
          alignment: 'center',
          margin: [50,10,50,15]
        },
        space:{
          margin: [50,20,50,20]
        }
      } // final de los estilos
    } // final de la constante
    
    //let name = 'Factura_'+this.obj_venta.fecha+'_'+this.obj_venta.id_venta+'.pdf';
    var pdf = pdfMake.createPdf(pdfDefinition) ;
    pdf.download('Factura_'+this.obj_venta.fecha+'_'+this.obj_venta.id_venta+'.pdf') ;
    pdf.open() ;
  }
}
