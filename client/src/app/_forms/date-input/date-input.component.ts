import { CommonModule } from '@angular/common';
import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-date-input',
  standalone: true,
  imports: [ReactiveFormsModule, BsDatepickerModule, CommonModule],
  templateUrl: './date-input.component.html',
  styleUrl: './date-input.component.css'
})
export class DateInputComponent implements ControlValueAccessor{
  @Input() label = '';
  @Input() maxDate: Date | undefined;
  bsConig: Partial<BsDatepickerConfig> | undefined;

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
    this.bsConig = {
      containerClass: 'theme-dark-blue',
      dateInputFormat: 'DD MMMM YYYY',
    }
  }

  writeValue(obj: any): void {
  }
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }

  get control(): FormControl {
    return this.ngControl.control as FormControl;
  }
}
