import { Component, OnInit } from '@angular/core';
import { User } from 'app/core/interface/user';
import { UserService } from 'app/core/services/user.service';
import { ActiveUsersListComponent } from "./active-users-list/active-users-list.component";

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [ActiveUsersListComponent],
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

    window.addEventListener('beforeunload', () => {
      this.userService.disconnect(this.currentUser);
    });
  }

  ngOnDestroy() {
    this.userService.disconnect(this.currentUser); 
  }

}
