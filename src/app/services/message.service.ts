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
    if (message.close) {
      setTimeout(() => {
        this.removeMessage(message);
      }, 10000);
    }
  }

  removeMessage(message: Message) {
    const indexToRemove = this.getMessageIndex(message);
    this.messages.splice(indexToRemove, 1);
  }

  getMessageIndex(message: Message) {
    let indexToRemove;
    this.messages.forEach((currentMsg, index) => {
      if (currentMsg.id === message.id) { indexToRemove = index; }
    });
    return indexToRemove;
  }

  clearMessages() {
    this.messages = [];
  }
}
