import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Peliculas } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  peliculasRecientes: Peliculas[] = [];
  populares: Peliculas[] = [];

  constructor(private moviesService: MoviesService) {}

  slideOpts = {
    slidesPerView: 1.3,
    freeMode: true
  };

  sliderOptsSpinner = {
    allowSlidePrev: false,
    allowSlideNext: false
  };

  ngOnInit() {

    this.moviesService.getFeature().subscribe( resp => {
      console.log(resp);
      this.peliculasRecientes = resp.results;
    });

    this.getPopulares();

  }

  cargarMas() {
    this.getPopulares();
  }

  getPopulares() {
    this.moviesService.getPopulares().subscribe( resp => {
      const arrTemp = [...this.populares, ...resp.results];
      this.populares = arrTemp;
    });
  }

}
