import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { ProductoDescripcion } from '../../interfaces/producto-descripcion.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  producto: ProductoDescripcion ;
  id: string;

  // Rescata el año actual
  dia: number = new Date().getDay();
  mes: number = new Date().getMonth();
  anio: number = new Date().getFullYear();

  fechaActual : string = `Fecha publicación: ${this.dia}-${this.mes}-${this.anio}` ;

  constructor( private route: ActivatedRoute, public productoService: ProductosService) { }

  ngOnInit() {

    this.route.params.subscribe( parametros => {
        this.productoService.getProducto(parametros['id'])
        .subscribe( (producto: ProductoDescripcion) => {
            //console.log(producto);
            this.producto = producto;
            this.id = parametros['id'];
        });

    });
  }

}
