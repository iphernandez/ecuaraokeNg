import { Injectable } from '@angular/core';

import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: Message[] = [];

  constructor() { }

  addMessage(message: Message) {
    message.id = this.messages.length;
    this.messages.push(message);
  }

  removeMessage(message: Message) {
    var indexToRemove = this.getMessageIndex(message);
    this.messages.splice(indexToRemove, 1);
  }

  getMessageIndex(message: Message) {
    var indexToRemove;
    this.messages.forEach(function (currentMsg, index) {
      if (currentMsg.id === message.id) indexToRemove = index;
    });
    return indexToRemove;
  }

  clearMessages() {
    this.messages = [];
  }
}
