import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { ReplaySubject, map } from 'rxjs';
import { User } from '../_models/user';
import { environment } from '../../environments/environment.development';
import { LikesService } from './likes.service';
import { PresenceService } from './presence.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);
  private likeService = inject(LikesService);
  private presenceService = inject(PresenceService);

  baseUrl = environment.apiUrl;
  currentUser = signal<User | null>(null);
  roles = computed(() => {
    const user = this.currentUser();
    if (user && user.token) {
      const decodedToken = JSON.parse(atob(user.token.split('.')[1]));
      return Array.isArray(decodedToken.role) ? decodedToken.role : [decodedToken.role];
    }
    return [];
  })

  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map(user => {
        if (user) {
          this.setCurrentUser(user);
        }
      })
    )
  }

  register(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map(respone => {
        const user = respone;
        if (user) {
          this.setCurrentUser(user);
        }
      })
    )
  }

  setCurrentUser(user: User) {
    this.currentUser.set(user);
    localStorage.setItem('user', JSON.stringify(user));
    this.likeService.getLikeIds();
    this.presenceService.createHubConnection(user);
  }


  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
    this.presenceService.stopHubConnection();
  }
}
