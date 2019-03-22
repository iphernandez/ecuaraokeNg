import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MessageService } from '../services/message.service';
import { AuthService } from '../services/auth.service';

import { Song } from '../models/song';
import database from '../../assets/data/canciones.json';

@Injectable({
  providedIn: 'root'
})

export class SongService {
  allSongs: Song[] = database.canciones;
  songQueue: Song[] = [];

  constructor(private httpClient: HttpClient,
    private messageService: MessageService,
    private authService: AuthService) { }

  addSongToQueue(song: Song) {
    if (!song || !song.id) {
      this.messageService.addMessage({
        id: -1,
        text: 'Ele, no sea shunsho y busque bien',
        title: `La canción  ${song.titulo} NO se agregó en la lista`,
        type: 'alert-danger',
        tag: null,
        close: true
      });
    } else {
      var songToAdd: Song = Object.assign({}, song);
      songToAdd.cantante = this.authService.currentUser.name;
      this.songQueue.push(songToAdd);
      this.messageService.addMessage({
        id: -1,
        text: 'Cantara bien, no hará quedar mal. Alzando pelito!',
        title: `La canción ${songToAdd.titulo} se agregó en la lista para ${songToAdd.cantante.toUpperCase()}`,
        type: 'alert-success',
        tag: songToAdd.genero.replace(/[&.][\s*]/, "").trim(),
        close: true
      });
    }
  }

  removeSongFromQueue(song: Song) {
    var index = this.songQueue.indexOf(song);
    if ((index < 0) || (index >= this.songQueue.length)) {
      this.messageService.addMessage({
        id: -1,
        text: 'Algun vivo ya la borró, y por shunsh@ le ganaron.',
        title: `La canción ${song.titulo} no esta en la lista`,
        type: 'alert-danger',
        tag: null,
        close: true
      });
    } else {
      this.songQueue.splice(index, 1);
      this.messageService.addMessage({
        id: -1,
        text: `Uuuuu!!! ${song.cantante} ya se acholó. Busque otra mejor breve breve para que cante`,
        title: `La canción  ${song.titulo}  se borró de la lista`,
        type: 'alert-warning',
        tag: null,
        close: true
      });
    }
  }
}
