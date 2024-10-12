import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.css',
})
export class ChatInputComponent implements OnInit {
  content: string = '';

  @Output() contentEmitter = new EventEmitter();

  ngOnInit(): void {}

  sendMessage() {
    if (this.content.trim() !== '') {
      this.contentEmitter.emit(this.content);
    }
    this.content='';
  }
}
