import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MessageService } from '../services/message.service';

import { Song } from '../models/song';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  apiURL: string = 'http://www.server.com/api/';
  songQueue: Song[] = [];
  constructor(private httpClient: HttpClient, private messageService: MessageService) { }

  addSongToQueue(song: Song) {
    if (!song || !song.id) this.messageService.add({
      id: -1,
      text: 'Cannot add song to queue',
      title: 'Queue Alert',
      type: 'alert-danger',
      close: true
    });
    this.songQueue.push(song);
  }

  removeSongFromQueue(index: number) {
    if ((!index) || (index >= this.songQueue.length)) {
      this.messageService.add({
        id: -1,
        text: `Cannot remove song ${index} from queue`,
        title: 'Queue Alert',
        type: 'alert-danger',
        close: true
      });
    }
    this.songQueue.splice(index, 1);
  }
}
