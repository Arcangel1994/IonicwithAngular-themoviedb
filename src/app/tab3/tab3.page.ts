import { Component, OnInit } from '@angular/core';
import { PeliculaDetalle, Genre } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  peliculas: PeliculaDetalle[] = [];
  generos: Genre[] = [];

  favoritoGenero: any[] = [];

  constructor(private dataLocalService: DataLocalService, private moviesService: MoviesService) {}

  async ngOnInit() {}

  async ionViewWillEnter() {
    this.peliculas = await this.dataLocalService.cargarFavoritos();
    this.generos = await this.moviesService.cargarGeneros();
    this.pelisPorGenero(this.generos, this.peliculas);
  }

  pelisPorGenero(genero: Genre[], peliculas: PeliculaDetalle[]) {

    this.favoritoGenero = [];

    // tslint:disable-next-line: no-shadowed-variable
    genero.forEach (genero => {
      this.favoritoGenero.push({
        genero: genero.name,
        pelis: peliculas.filter( peli => {
          return peli.genres.find(genre => genre.id === genero.id);
        })
      });
    });

  }

  async refrescarLista(event) {
    if (!event) {
      this.peliculas = await this.dataLocalService.cargarFavoritos();
      this.generos = await this.moviesService.cargarGeneros();
      this.pelisPorGenero( this.generos, this.peliculas );
    }
  }

}
