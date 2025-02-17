import { Component, inject, input, Input, OnInit, ViewChild } from '@angular/core';
import { Message } from '../../_models/message';
import { MessageService } from '../../_services/message.service';
import { CommonModule } from '@angular/common';
import { TimeagoModule } from 'ngx-timeago';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-messages',
  standalone: true,
  imports: [CommonModule, TimeagoModule, FormsModule],
  templateUrl: './member-messages.component.html',
  styleUrl: './member-messages.component.css'
})
export class MemberMessagesComponent{
  @ViewChild('messageForm') messageForm?: NgForm;

  messageService = inject(MessageService);  
  username = input.required<string>();
  messageContent = '';

  sendMessage() {
    this.messageService.sendMessage(this.username(), this.messageContent).then(() => {
      this.messageForm?.reset();
    })
  }

}
