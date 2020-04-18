import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[];
  productosFiltrados: Producto[] = [];

  constructor(private http: HttpClient) { 

    this.cargarProductos();

  }

  private cargarProductos(){

    return new Promise((resolve, reject) =>{
        this.http.get('https://angular-html-danielam.firebaseio.com/productos_idx.json').
        subscribe(( resp:Producto[] ) => {
          this.productos = resp;
          this.cargando = false;
          resolve();
        });
    });
  }

  getProducto(id: string) {
    return this.http.get(`https://angular-html-danielam.firebaseio.com/productos/${id}.json`);
  }

  buscarProducto(termino: string){

    //console.log("Valor perdiddo: " + this.productos.length);

    if(this.productos.length === 0){
      // Csrgar productos
      this.cargarProductos().then(()=>{
        // ejecuta despues de tener los productos
        // Aplicar filtro.
        this.filtrarProductos(termino);
      })
    }else{
      // Aplicar fitro
      this.filtrarProductos(termino);

    }

  }

  private filtrarProductos(termino: string){
    // console.log(this.productos);

    this.productosFiltrados = [];

    termino = termino.toLocaleLowerCase();

    this.productos.forEach(prod =>{

      const tituloLower = prod.titulo.toLocaleLowerCase();

      if(prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0){
        this.productosFiltrados.push(prod);
      }
    });
  }
}
