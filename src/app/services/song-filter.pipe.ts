import { Pipe, PipeTransform } from '@angular/core';

import { Song } from '../models/song';

@Pipe({
    name: 'songFilter',
    standalone: false
})
export class SongFilterPipe implements PipeTransform {

  transform(items: Song[], searchText: string): Song[] {
    if (!searchText) { return items; }
    if (!items || searchText.length < 3) { return items; }

    return items.filter(it => {
      return (it.titulo.toLowerCase().indexOf(searchText.toLowerCase()) > -1) ||
        (it.artista.toLowerCase().indexOf(searchText.toLowerCase()) > -1);
    });
  }
}
