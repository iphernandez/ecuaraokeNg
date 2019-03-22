import { Component, OnInit } from '@angular/core';

import { environment } from '../../../environments/environment';

import { MessageService } from '../../services/message.service';
import { SongService } from '../../services/song.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  appTitle = environment.appTitle;
  appDescription = environment.appDescription;

  constructor(public songService: SongService) {
  }

  ngOnInit() {
  }

  deleteFromQueue(song) {
    this.songService.removeSongFromQueue(song);
  }

  ngOnDestroy() {
    //alert("THIS IS AN ALERT");
  }
}
