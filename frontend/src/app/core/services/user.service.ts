import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'app/core/interface/user';
import { Observable, Subject } from 'rxjs';
import { enviroment } from '../../../environments/enviroments';
import { CompatClient, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = enviroment.apiUrl + enviroment.apiVersion + 'users';
  private webSocketUrl = enviroment.apiUrl + enviroment.webSocketUrl;
  private stompClient: CompatClient = {} as CompatClient;
  private subscriptionActiveUsers: any;
  private activeUserSubject = new Subject<User>();
  activeUsers: {
    [key: string]: string;
  } = {
    ONLINE: 'ONLINE',
    OFFLINE: 'OFFLINE'
  }

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

  getFromLocalStorage(): User {
    return JSON.parse(localStorage.getItem('user') ?? '{}');
  }

  connect(user: User) {
    const socket = new SockJS(this.webSocketUrl);

    this.stompClient = Stomp.over(socket);
    this.stompClient.connect(
      {},
      () => this.onConnect(user),
      (error: any) => console.log(error)
    );
  }

  private onConnect(user: User) {
    this.subscribeActive();
    this.sendConnect(user);
  }

  private subscribeActive() {
    this.subscriptionActiveUsers = this.stompClient.subscribe('/topic/active', (message: any) => {

      // const user = JSON.parse(message);
      const user = JSON.parse(message.body);

      console.log(user);

      this.activeUserSubject.next(user);
    });
  }

  sendConnect(user: User) {
    this.stompClient.send(
      '/app/user/connect',
      {},
      JSON.stringify(user)
    );
  }

  disconnect(user: User) {
    this.sendDisconnect(user);

    this.stompClient.disconnect(() => {
      console.log('disconnect');
    });

    this.subscriptionActiveUsers?.unsubscribe();
  }

  sendDisconnect(user: User) {
    this.stompClient.send(
      '/app/user/disconnect',
      {},
      JSON.stringify(user)
    );
  }

  subscribeActiveUsers(): Observable<User> {
    return this.activeUserSubject.asObservable();
  }

  getOnlineUsers(): Observable<User[]> {
    const url = this.apiUrl + '/online';

    return this.http.get<User[]>(url);
  }

  getUserStatus(username?: string): boolean {
    if(!username) return false;

    return this.activeUsers[username] === 'ONLINE';
  }

}
