import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { Message } from '../../models/message';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title = 'ECUAraoke';

  constructor(public messageService: MessageService) { }

  ngOnInit() {
  }

  addANewMessage() {
    var message: Message = { text: 'This is an Alert from home page', title: 'Home Message', type: 'primary', close: true };
    this.messageService.add(message);
  }

  clearAllMessage() {
    this.messageService.clear();
  }
}
