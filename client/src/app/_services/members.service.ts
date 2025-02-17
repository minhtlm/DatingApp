import { inject, Injectable, model, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Member } from '../_models/member';
import { map, of, take } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';
import { UserParams } from '../_models/userParams';
import { User } from '../_models/user';
import { AccountService } from './account.service';
import { getPaginatedResponse, getPaginationHeaders } from './paginationHelper';
import { Photo } from '../_models/photo';



@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private http = inject(HttpClient);
  private accountService = inject(AccountService);
  
  baseUrl = environment.apiUrl;
  paginatedResult = signal<PaginatedResult<Member[]> | null>(null);
  memberCache = new Map();
  user = this.accountService.currentUser();
  userParams = model<UserParams>(new UserParams(this.user));

  resetUserParams() {
    this.userParams.set(new UserParams(this.user));
  }

  getMembers() {
    const response = this.memberCache.get(Object.values(this.userParams()).join('-'));

    if (response) return getPaginatedResponse(response, this.paginatedResult);

    let params = getPaginationHeaders(this.userParams().pageNumber, this.userParams().pageSize);

    params = params.append('minAge', this.userParams().minAge);
    params = params.append('maxAge', this.userParams().maxAge);
    params = params.append('gender', this.userParams().gender);
    params = params.append('orderBy', this.userParams().orderBy);

    return this.http.get<Member[]>(this.baseUrl + 'users', {observe: 'response', params}).subscribe({
      next: response => {
        getPaginatedResponse(response, this.paginatedResult);
        this.memberCache.set(Object.values(this.userParams()).join('-'), response);
      }
    })
  }



  getMember(username: string) {
    const member: Member = [...this.memberCache.values()]
      .reduce((arr, elem) => arr.concat(elem.body), [])
      .find((member: Member) => member.username === username);

    if (member) return of(member);

    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'users', member).pipe(
      //???
    )
  }

  setMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
  }

  deletePhoto(photo: Photo) {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photo.id);
  }

  addLike(username: string) {
    return this.http.post(this.baseUrl + 'likes/' + username, {});
  }

  // getLikes(predicate: string, pageNumber: number, pageSize: number) {
  //   let params = getPaginationHeaders(pageNumber, pageSize);
  //   params = params.append('predicate', predicate);
  //   return getPaginatedResponse<Member[]>(this.baseUrl + 'likes', params, this.http);
  // }
}
