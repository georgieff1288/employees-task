import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import { Message } from '../models/message.model';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private chatUrl = environment.chatURL;

  webSocket!: WebSocket;
  messages: Message[] = [];

  constructor() {
  }



  public openWebSocket(){
    this.webSocket = new WebSocket(this.chatUrl);

    this.webSocket.onopen = (event) => {
      console.log('Open: ', event);
    };

    this.webSocket.onmessage = (event) => {
      event.data.text().then((text: any) => {
        this.messages.push(JSON.parse(text))
      })
    };

    this.webSocket.onclose = (event) => {
      console.log('Close: ', event);
    };
  }

  public sendMessage(message: Message){
    this.webSocket.send(JSON.stringify(message));
  }

  public closeWebSocket() {
    this.webSocket.close();
  }

}
