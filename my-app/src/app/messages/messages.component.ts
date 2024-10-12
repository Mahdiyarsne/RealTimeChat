import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../models/message';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent implements OnInit {
 @Input() messages: Message[]=[]

  ngOnInit(): void {
  }



}
