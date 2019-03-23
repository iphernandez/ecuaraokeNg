import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

import { environment } from '../../../environments/environment';

import { SongService } from '../../services/song.service';

import { Song } from '../../models/song';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  refreshQueue: Subscription;
  appTitle = environment.appTitle;
  appDescription = environment.appDescription;

  constructor(public songService: SongService) {
  }

  ngOnInit() {
    this.refreshQueue = interval(20000).subscribe(x => {
      this.songService.getSongQueue();
    });
  }

  deleteFromQueue(song) {
    this.songService.removeSongFromQueue(song);
  }

  ngOnDestroy() {
    this.refreshQueue.unsubscribe();
  }
}
