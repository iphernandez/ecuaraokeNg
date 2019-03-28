import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './templates/navbar/navbar.component';
import { FooterComponent } from './templates/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { MessagesComponent } from './templates/messages/messages.component';
import { AboutComponent } from './pages/about/about.component';
import { ListComponent } from './pages/list/list.component';
import { SongFilterPipe } from './services/song-filter.pipe';
import { LoginComponent } from './pages/login/login.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    MessagesComponent,
    AboutComponent,
    ListComponent,
    SongFilterPipe,
    LoginComponent,
    FavoritesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
