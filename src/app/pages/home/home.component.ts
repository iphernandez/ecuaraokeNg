import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { SongService } from '../../services/song.service';

import { Song } from '../../models/song';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title = 'ECUAraoke';

  constructor(public messageService: MessageService, public songService: SongService) { }

  ngOnInit() {
  }

  addASong() {
    var song = new Song;
    this.songService.addSongToQueue(song);
  }

  addANewMessage() {
    this.addASong();
  }

  clearAllMessage() {
    this.messageService.clearMessages();
  }
}
