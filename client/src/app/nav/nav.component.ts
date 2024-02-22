import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import e, { response } from 'express';
import { error } from 'console';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { User } from '../_models/user';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  model: any={}

  constructor(public accountService: AccountService) {}

  ngOnInit(): void {
    
  }

  login() {
    this.accountService.login(this.model).subscribe({
      next: response => {
        console.log(response);
      },
      error: error => console.log(error)
    })
  }

  logout() {
    this.accountService.logout();
  }

}
