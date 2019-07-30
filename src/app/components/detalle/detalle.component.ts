
import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { PeliculaDetalle, Cast } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() id;

  pelicula: PeliculaDetalle = {};
  actores: Cast[] = [];
  oculto = 150;
  corazon = false;

  slideOptActores = {
    slidesPerView: 2.8,
    freeMode: true,
    spaceBetween: 0
  };

  // tslint:disable-next-line:max-line-length
  constructor(private moviesService: MoviesService, private modalCtrl: ModalController, private dataLocalService: DataLocalService ) { }

  async ngOnInit() {

    this.dataLocalService.existePelicula(this.id).then(existe => this.corazon = existe);

    this.moviesService.getPeliculaDetalle(this.id)
    .subscribe(resp => {
      console.log(resp);
      this.pelicula = resp;
    });

    this.moviesService.getActoresPelicula(this.id)
    .subscribe(resp => {
      console.log(resp);
      this.actores = resp.cast;
    });

  }

  regresar() {
    let existe = false;
    if (this.corazon) {
       existe = true;
    }

    this.modalCtrl.dismiss(
      {
        existe
      }
    );
  }

  favorito() {
    const existe = this.dataLocalService.guardarPelicula( this.pelicula );
    this.corazon = existe;
  }

}
