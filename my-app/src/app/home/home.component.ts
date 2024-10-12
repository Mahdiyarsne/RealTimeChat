import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChatHubService } from '../services/chat.service';
import { ChatComponent } from '../chat/chat.component';
@Component({
  selector: 'home',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ChatComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  userForm: FormGroup = new FormGroup({});
  submitted = false;
  apiErrorMessages: string[] = [];
  openChat = false;

  constructor(
    private formBuilder: FormBuilder,
    private chatService: ChatHubService
  ) {}

  ngOnInit(): void {
    this.initialForm();
  }
  initialForm() {
    this.userForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ],
      ],
    });
  }

  submitForm() {
    this.submitted = true;
    this.apiErrorMessages = [];

    if (this.userForm.valid) {
      this.chatService.registerUser(this.userForm.value).subscribe({
        next: () => {
          this.chatService.myName = this.userForm.get('name')?.value;
          this.openChat = true;
          this.userForm.reset();
          this.submitted = false;
        },
        error: (error) => {
          if (typeof error.error !== 'object') {
            this.apiErrorMessages.push(error.error);
          }
        },
      });
    }
  }

  closeChat() {
    this.openChat = false;
  }
}
