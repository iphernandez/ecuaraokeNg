import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { MessageService } from '../../services/message.service';
import { SongService } from '../../services/song.service';
import { AuthService } from '../../services/auth.service';

import { Song } from '../../models/song';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  selectedSong: Song;
  appTitle: string;

  constructor(public messageService: MessageService,
    public songService: SongService,
    private authService: AuthService) { }

  ngOnInit() {
    this.appTitle = environment.appTitle;
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.songService.allSongs.filter(v => ((v.titulo.toLowerCase().indexOf(term.toLowerCase()) > -1) || (v.artista.toLowerCase().indexOf(term.toLowerCase()) > -1))).slice(0, 15))
    )

  formatter = (x: { titulo: string }) => null;

  selectedSongEvent(item) {
    var songToAdd: Song = item.item;
    this.songService.addSongToQueue(songToAdd);
  }
}
