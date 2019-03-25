import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, tap, catchError } from 'rxjs/operators';

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
  searching = false;
  searchFailed = false;

  constructor(
    public messageService: MessageService,
    public songService: SongService,
    private authService: AuthService) { }

  ngOnInit() {
    this.appTitle = environment.appTitle;
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term => term.length < 3 ? of([]) :
        this.songService.searchSong(term).pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    )

  formatter = (x: { titulo: string }) => null;

  selectedSongEvent(item) {
    const songToAdd: Song = item.item;
    this.songService.addSongToQueue(songToAdd);
  }
}
