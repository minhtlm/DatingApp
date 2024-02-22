import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { error } from 'console';
import { response } from 'express';
import { NavComponent } from "./nav/nav.component";
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';
import { HomeComponent } from './home/home.component';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, CommonModule, NavComponent, FormsModule, BsDropdownModule, HomeComponent]
})
export class AppComponent implements OnInit {
  title = 'The Dating App';

  users: any;

  constructor(private accountService: AccountService) {}
  
  ngOnInit(): void {
    this.setCurrentUser();
  }


  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user')!);
    this.accountService.setCurrentUser(user);
  }

}
