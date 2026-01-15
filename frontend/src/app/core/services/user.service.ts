import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'app/core/interface/user';
import { Observable } from 'rxjs';
import { enviroment } from '../../../environments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = enviroment.apiUrl + enviroment.apiVersion + 'users';

  constructor(private http: HttpClient) {
    console.log(enviroment);
  }

  login(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  saveToLocalStorage(user: User) {
    localStorage.setItem('user', JSON.stringify({
      username: user.username,
      avatarUrl: user.avatarUrl
    }));
  }

}
