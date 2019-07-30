import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Peliculas } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {

  @Input() peliculasRecientes: Peliculas[] = [];
  @Output() refrescaLista = new EventEmitter<string>();

  slideOpts = {
    slidesPerView: 3.2,
    freeMode: true
  };

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  async verDetalle(id: string) {
    const modal = await this.modalController.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();
    this.refrescaLista.emit(data.existe);

  }

}
