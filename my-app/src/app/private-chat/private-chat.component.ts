import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ChatHubService } from '../services/chat.service';
import { MessagesComponent } from "../messages/messages.component";
import { ChatInputComponent } from "../chat-input/chat-input.component";

@Component({
  selector: 'app-private-chat',
  standalone: true,
  imports: [MessagesComponent, ChatInputComponent],
  templateUrl: './private-chat.component.html',
  styleUrl: './private-chat.component.css',
})
export class PrivateChatComponent implements OnInit,OnDestroy {

  @Input() toUser='';

  constructor(public activeModal : NgbActiveModal, public chatService: ChatHubService){}
  ngOnDestroy(): void {
   this.chatService.closePrivateChatMessage(this.toUser);
  }
  ngOnInit(): void {}

  sendMessage(content: string){
    this.chatService.sendPrivateMessage(this.toUser,content);
  }
}
