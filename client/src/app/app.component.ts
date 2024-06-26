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
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './_modules/shared.module';
import { TimeagoIntl } from 'ngx-timeago';
import { strings as stringsEn } from 'ngx-timeago/language-strings/en';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, NavComponent, FormsModule, HomeComponent, SharedModule]
})
export class AppComponent implements OnInit {
  title = 'The Dating App';

  users: any;

  constructor(private accountService: AccountService, private intl: TimeagoIntl) {
    this.intl.strings = stringsEn;
    this.intl.changes.next();
  }
  
  ngOnInit(): void {
    this.setCurrentUser();
  }


  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user: User = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }

}
