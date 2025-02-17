import { Directive, inject, input, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { take } from 'rxjs';

@Directive({
  selector: '[appHasRole]',
  standalone: true
})
export class HasRoleDirective implements OnInit {
  private accountService = inject(AccountService);
  private viewContainerRef = inject(ViewContainerRef);
  private templateRef = inject(TemplateRef)
  // appHasRole = input.required<string[]>();
  @Input() appHasRole: string[] = [];


  ngOnInit(): void {
    if ((this.accountService.roles() ?? []).some((r: string) => this.appHasRole.includes(r))) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
    else {
      this.viewContainerRef.clear();
    }
  }

}
