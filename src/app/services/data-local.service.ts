import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { PeliculaDetalle } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  peliculas: PeliculaDetalle[] = [];

  constructor(private storage: Storage, public toastController: ToastController) {
    this.cargarFavoritos();
   }

   async cargarFavoritos() {

    const peliculas = await this.storage.get('peliculas');
    this.peliculas = peliculas || [];
    return this.peliculas;
  }

  async existePelicula( id ) {

    await this.cargarFavoritos();
    const existe = this.peliculas.find( peli => peli.id === id );

    return (existe) ? true : false;
  }

  guardarPelicula(pelicula: PeliculaDetalle) {

    let existe = false;
    let mensaje = '';
    let color = '';

    for (const peli of this.peliculas) {
      if (peli.id === pelicula.id) {
        existe = true;
        break;
      }
    }

    if ( existe ) {
      this.peliculas = this.peliculas.filter( peli => peli.id !== pelicula.id );
      mensaje = 'Removido de favoritos';
      color = 'danger';
    } else {
      this.peliculas.push( pelicula );
      mensaje = 'Agregada a favoritos';
      color = 'success';
    }


    this.presentToast( mensaje , color);
    this.storage.set('peliculas', this.peliculas );

    return !existe;

  }

  async presentToast(message: string, color) {
    const toast = await this.toastController.create({
      message,
      duration: 1000,
      color,
      mode: 'ios'
    });
    toast.present();
  }

}
