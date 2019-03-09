import { Injectable } from '@angular/core';

import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: Message[] = [];

  constructor() { }

  add(message: Message) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}
