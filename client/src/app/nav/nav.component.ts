import { Component, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { response } from 'express';
import { error } from 'console';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HasRoleDirective } from '../_directives/has-role.directive';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, BsDropdownModule, HasRoleDirective],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  accountService = inject(AccountService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  model: any = {};

  // constructor() {
  //   effect(() => {
  //     console.log("Current user in nav: ", this.accountService.currentUser());
  //   })
  // }

  login() {
    this.accountService.login(this.model).subscribe({
      next: _ => {
        this.router.navigateByUrl('/members')
      },
        error: error => this.toastr.error(error.error)
    })
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

}
