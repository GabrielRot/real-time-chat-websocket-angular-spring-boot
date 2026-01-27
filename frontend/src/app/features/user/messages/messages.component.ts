import { Component, OnInit } from '@angular/core';
import { User } from 'app/core/interface/user';
import { UserService } from 'app/core/services/user.service';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent {
  /**
   * 1. connect /api/ws
   * 2. subscribe /topic/active
   * 3. send connect to others /app/user/connect
   */

  currentUser: User = {};
  activeUserSubscription: any;

  constructor(private userService: UserService) {}

  ngOnInit() {

    this.currentUser = this.userService.getFromLocalStorage();

    this.userService.connect(this.currentUser);

    this.activeUserSubscription = this.userService.subscribeActiveUsers().subscribe({
      next: (user: User) => {
        console.log(user);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
