import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class AboutComponent implements OnInit {

  appTitle = environment.appTitle;

  constructor() { }

  ngOnInit() {
  }

}
