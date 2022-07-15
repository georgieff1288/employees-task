import {AfterViewChecked, AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {WebsocketService} from "../../services/websocket.service";
import {Message} from "../../models/message.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('feed') feedContainer!: ElementRef;
  receivedMessages: Message[] = this.webSocketService.messages;
  chatForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required])
  });

  constructor(private webSocketService: WebsocketService) {
  }

  ngOnInit(): void {
    this.webSocketService.openWebSocket();
  }
  ngOnDestroy(): void {
    this.webSocketService.closeWebSocket();
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  scrollToBottom(): void {
    this.feedContainer.nativeElement.scrollTop
      = this.feedContainer.nativeElement.scrollHeight;
  }
  get username() { return this.chatForm.get('username'); }
  get content() { return this.chatForm.get('content'); }

  send() {
    let message = {
      sender: this.chatForm.value.username ?? 'no username',
      content: this.chatForm.value.content ?? 'no content'
    };
    this.chatForm.controls['content'].reset();
    this.webSocketService.sendMessage(message);
  }

}
