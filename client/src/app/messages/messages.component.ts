import { Component, inject, OnInit } from '@angular/core';
import { Message } from '../_models/message';
import { Pagination } from '../_models/pagination';
import { MessageService } from '../_services/message.service';
import { response } from 'express';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TimeagoModule } from 'ngx-timeago';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TimeagoModule, PaginationModule, ButtonsModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent implements OnInit{
  messageService = inject(MessageService);

  messages: Message[] = [];
  pagination: Pagination | undefined;
  container = 'Inbox';
  pageNumber = 1;
  pageSize = 5;
  isOutbox = this.container === "Outbox";


  ngOnInit(): void {
    this.loadMessages();
  }


  loadMessages() {
    this.messageService.getMessages(this.pageNumber, this.pageSize, this.container);
  }

  deleteMessage(id: number) {
    this.messageService.deleteMessage(id).subscribe({
      next: _ => {
        this.messageService.paginatedResult.update(prev => {
          if (prev && prev.result) {
            prev.result.slice(prev.result.findIndex(m => m.id), 1)
            return prev;
          }
          return prev;
        })
      }
    })
  }

  pageChanged(event: any) {
    if (this.pageNumber !== event.page) {
      this.pageNumber = event.page;
      this.loadMessages();
    }
  }

  getRoute(message: Message) {
    if (this.container === 'Outbox') return `/members/${message.recipientUsername}`;
    else return `/members/${message.senderUsername}`;
  }

}
