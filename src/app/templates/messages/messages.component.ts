import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';

import { Message } from '../../models/message';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  constructor(public messageService: MessageService) { }

  ngOnInit() {
  }

  removeMessage(message: Message) {
    this.messageService.remove(message);
  }
}
