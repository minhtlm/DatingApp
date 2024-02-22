import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RegisterComponent } from "../register/register.component";
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [CommonModule, RegisterComponent]
})
export class HomeComponent {
  users: any;
  registerMode = false;

  constructor() {}

  ngOnInit(): void {
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }



  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }

}
