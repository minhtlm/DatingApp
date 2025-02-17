import { Component, inject, OnInit } from '@angular/core';
import { Member } from '../_models/member';
import { MembersService } from '../_services/members.service';
import { FormsModule } from '@angular/forms';
import { MemberCardComponent } from "../members/member-card/member-card.component";
import { CommonModule } from '@angular/common';
import { Pagination } from '../_models/pagination';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { LikesService } from '../_services/likes.service';

@Component({
    selector: 'app-lists',
    standalone: true,
    templateUrl: './lists.component.html',
    styleUrl: './lists.component.css',
    imports: [FormsModule, MemberCardComponent, CommonModule, PaginationModule, ButtonsModule]
})
export class ListsComponent implements OnInit{
  likesService = inject(LikesService);

  predicate = 'liked';
  pageNumber = 1;
  pageSize = 5;


  ngOnInit(): void {
    this.loadLikes();
  }

  loadLikes() {
    this.likesService.getLikes(this.predicate, this.pageNumber, this.pageSize);
  }

  getTitle() {
    switch (this.predicate) {
      case 'liked': return 'Members you like';
      case 'likedBy': return 'Members who like you';
      default: return 'Mutual';
    }
  }

  pageChanged(event: any) {
    if (this.pageNumber !== event.page) {
      this.pageNumber = event.page;
      this.loadLikes();
    }
  }

  ngOnDestroy() {
    this.likesService.paginatedResult.set(null);
  }
}
