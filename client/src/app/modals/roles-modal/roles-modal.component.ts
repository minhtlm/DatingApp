import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { EventEmitter } from 'stream';
import { User } from '../../_models/user';

@Component({
  selector: 'app-roles-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './roles-modal.component.html',
  styleUrl: './roles-modal.component.css'
})
export class RolesModalComponent {
  username = '';
  title = '';
  availableRoles: string[] = [];
  selectedRoles: string[] = [];
  rolesUpdated = false;

  bsModalRef = inject(BsModalRef);

  updateChecked(checkedValue: string) {
    if (this.selectedRoles.includes(checkedValue)) {
      this.selectedRoles = this.selectedRoles.filter(r => r !== checkedValue)
    } else {
      this.selectedRoles.push(checkedValue);
    }
  }

  onSelectRoles() {
    this.rolesUpdated = true;
    this.bsModalRef.hide();
  }
}
