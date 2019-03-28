import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { MessageService } from '../services/message.service';
import { AuthService } from '../services/auth.service';

import { Song } from '../models/song';
import { Result } from '../models/result';

@Injectable({
  providedIn: 'root'
})

export class SongService {
  apiUrl: string = environment.apiUrl;
  endpoints = {
    list: `${this.apiUrl}list`,
    queue: `${this.apiUrl}queue`
  };
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  allSongs: Song[];
  songQueue: Song[];
  songFavs: Song[];

  constructor(
    private httpClient: HttpClient,
    private messageService: MessageService,
    private authService: AuthService) {

    this.getSongList();

    this.getSongQueue();

    this.getSongFavs();
  }

  getSongList() {
    // Getting song list
    return this.httpClient.get(this.endpoints.list, this.httpOptions)
      .subscribe((res: Result) => { this.allSongs = res.data; });
  }

  getSongQueue() {
    // Getting song queue
    return this.httpClient.get(this.endpoints.queue, this.httpOptions)
      .subscribe((res: Result) => { this.songQueue = res.data; });
  }

  getSongFavs() {
    // Getting favorites songs
    let favObj = JSON.parse(localStorage.getItem('favoriteSongs'));
    this.songFavs = favObj[this.authService.currentUser.name] || [];
  }

  getSendObj() {
    return {
      songs: []
    };
  }

  addSongToQueue(song: Song) {
    if (!song || !song.id) {
      this.messageService.addMessage({
        id: -1,
        text: 'Ele, no sea shunsh@ y busque bien',
        title: `La canción  ${song.titulo} NO se agregó en la lista`,
        type: 'alert-danger',
        tag: null,
        close: true
      });
    } else {
      const songToAdd: Song = Object.assign({}, song);
      songToAdd.cantante = this.authService.currentUser.name;

      const addSongObj = this.getSendObj();
      addSongObj.songs.push(songToAdd);

      this.httpClient.post(this.endpoints.queue, JSON.stringify(addSongObj))
        .subscribe((res: Result) => {
          if (res.error) {
            this.messageService.addMessage({
              id: -1,
              text: 'Ele, no sea shunsh@ y busque bien',
              title: `La canción  ${song.titulo} NO se agregó en la lista`,
              type: 'alert-danger',
              tag: null,
              close: true
            });
          } else {
            this.songQueue = res.data;
            this.messageService.addMessage({
              id: -1,
              text: 'Cantara bien, no hará quedar mal. Alzando pelito!',
              title: `La canción ${songToAdd.titulo} se agregó en la lista para ${songToAdd.cantante.toUpperCase()}`,
              type: 'alert-success',
              tag: songToAdd.genero.replace(/[&.][\s*]/, '').trim(),
              close: true
            });
          }
        });
    }
  }

  removeSongFromQueue(song: Song) {
    const index = this.songQueue.indexOf(song);
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
      const addSongObj = this.getSendObj();
      addSongObj.songs.push(song);

      const deleteHttpOptions = {
        headers: {},
        body: JSON.stringify(addSongObj)
      };

      this.httpClient.delete(this.endpoints.queue, deleteHttpOptions)
        .subscribe((res: Result) => {
          if (res.error) {
            this.messageService.addMessage({
              id: -1,
              text: `Algun vivo ya la borró, y por shunsh@ le ganaron. Error: ${res.error}`,
              title: `La canción ${song.titulo} no esta en la lista`,
              type: 'alert-danger',
              tag: null,
              close: true
            });
          } else {
            this.songQueue = res.data;
            this.messageService.addMessage({
              id: -1,
              text: `Uuuuu!!! ${song.cantante} ya se acholó. Busque otra canción mejor breve breve para que cante`,
              title: `La canción  ${song.titulo}  se borró de la lista`,
              type: 'alert-warning',
              tag: null,
              close: true
            });
          }
        });
    }
  }

  searchSong(term: string) {
    return this.httpClient.get(`${this.endpoints.list}/${term}`, this.httpOptions)
      .pipe(
        map((res: Result) => res.data)
      );
  }

  addSongToFavorites(event: Event, song: Song) {
    event.stopPropagation();
    if (!this.isSongAFav(song)) {
      let songToAdd = Object.assign({}, song);
      songToAdd.index = this.songFavs.length + 1;
      this.songFavs.push(songToAdd);
      this.saveFavoriteSongs();
      this.messageService.addMessage({
        id: -1,
        text: 'Ay! Agregando canciones a tus favoritas, hazte un terno!',
        title: `La canción ${songToAdd.titulo} se agregó en la lista de favoritas de ${this.authService.currentUser.name.toUpperCase()}`,
        type: 'alert-success',
        tag: songToAdd.genero.replace(/[&.][\s*]/, '').trim(),
        close: true
      });
    }
  }

  removeSongFromFavorites(song: Song) {
    const index = this.songFavs.indexOf(song);
    if ((index < 0) || (index >= this.songFavs.length)) {
      this.messageService.addMessage({
        id: -1,
        text: 'Algun vivo ya te la borró, y por shunsh@ te ganaron.',
        title: `La canción ${song.titulo} no esta en tu lista de favoritas`,
        type: 'alert-danger',
        tag: null,
        close: true
      });
    } else {
      this.songFavs.splice(index, 1);
      this.saveFavoriteSongs();
      this.messageService.addMessage({
        id: -1,
        text: `Uy! ${this.authService.currentUser.name} ya cambio de gustos muy pronto! Ya le cogio la menopausia que anda cambiante`,
        title: `La canción  ${song.titulo}  se borró de la lista`,
        type: 'alert-warning',
        tag: null,
        close: true
      });

    }
  }

  isSongAFav(song: Song) {
    const index = this.songFavs.findIndex((songToFind) => {
      return songToFind.titulo === song.titulo && songToFind.id === song.id;
    });
    return index > -1;
  }

  saveFavoriteSongs() {
    localStorage.removeItem('favoriteSongs');
    let favObj = {};
    favObj[this.authService.currentUser.name] = this.songFavs;
    localStorage.setItem('favoriteSongs', JSON.stringify(favObj));
  }
}
