import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';

import { Message } from '../../models/message';
import { Tag, EnvironmentTag } from '../../models/tag.enum';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})

export class MessagesComponent implements OnInit {

  tags = Tag;

  constructor(public messageService: MessageService) { }

  ngOnInit() {
  }
}
