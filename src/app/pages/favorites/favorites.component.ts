import { Component, OnInit } from '@angular/core';

import { environment } from '../../../environments/environment';

import { SongService } from '../../services/song.service';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  appTitle = environment.appTitle;
  appDescription = environment.appDescription;

  constructor(public songService: SongService) { }

  ngOnInit() {
  }

}
