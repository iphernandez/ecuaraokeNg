import { Injectable } from '@angular/core';

import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: Message[] = [];

  constructor() { }

  add(message: Message) {
    message.id = this.messages.length;
    this.messages.push(message);
  }

  remove(message: Message) {
    var indexToRemove;

    this.messages.forEach(function (currentMsg, index) {
      if(currentMsg.id === message.id) indexToRemove = index;
    });

    this.messages.splice(indexToRemove, 1);
  }

  clear() {
    this.messages = [];
  }
}
