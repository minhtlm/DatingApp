import { CommonModule } from '@angular/common';
import { Component, Input, Output} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { error } from 'console';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor(private accountService: AccountService) {}

  register() {
    this.accountService.register(this.model).subscribe(response => {
      console.log(response);
      this.cancel();
    }, error => {
      console.log(error);
    })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
