import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';

import { environment } from '../../../environments/environment';

import { SongService } from '../../services/song.service';

import { Song } from '../../models/song';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  refreshQueue: Subscription;
  appTitle = environment.appTitle;
  appDescription = environment.appDescription;
  refreshing = false;

  constructor(public songService: SongService) {
  }

  ngOnInit() {
    this.refreshQueue = interval(20000).subscribe(x => {
      this.songService.getSongQueue();
    });
  }

  ngOnDestroy(): void {
    this.refreshQueue.unsubscribe();
  }

  manualRefreshQueue() {
    this.refreshing = true;
    setTimeout(() => {
      this.songService.getSongQueue();
      this.refreshing = false;
    }, 2000);
  }

  deleteFromQueue(song) {
    this.songService.removeSongFromQueue(song);
  }

}
