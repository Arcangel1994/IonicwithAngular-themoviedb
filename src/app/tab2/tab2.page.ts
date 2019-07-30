import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSearchbar, ModalController } from '@ionic/angular';
import { MoviesService } from '../services/movies.service';
import { Peliculas } from '../interfaces/interfaces';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  textoBuscar = '';
  // tslint:disable-next-line:max-line-length
  ideas: string[] = ['SpiderMan', 'Toy Story 4', 'El Rey Leon', 'John Wick 3', 'Godzilla'];

  peliculas: Peliculas[] = [];

  buscando = false;

  constructor(private moviesService: MoviesService, private modalController: ModalController) {}

  ngOnInit() { }

  buscar(event) {
    console.log(event);
    const valor: string = event.detail.value;

    if (valor.length === 0) {
      this.buscando = false;
      this.peliculas = [];
      return;
    } else {
      this.buscando = true;

      this.moviesService.buscarPelicular(valor).subscribe( resp => {
        console.log(resp);
        this.peliculas = resp.results;
        this.buscando = false;
      });
    }

  }

  async verDetalle(id: string) {
    const modal = await this.modalController.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });

    modal.present();

  }

}
