import { Component, OnInit } from '@angular/core';

import { SongService } from '../../services/song.service';
import { SongFilterPipe } from '../../services/song-filter.pipe';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    standalone: false
})
export class ListComponent implements OnInit {
  searchText = '';

  constructor(public songService: SongService) {
  }

  ngOnInit() {
  }

  addToQueue(song) {
    this.songService.addSongToQueue(song);
  }

  clearFilter() {
    this.searchText = '';
  }
}
