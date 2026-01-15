import { UserService } from './../../core/services/user.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from 'app/core/interface/user';
import { Button } from "primeng/button";
import { Password } from 'primeng/password';
import { PrimengModule } from 'app/primeng/primeng.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [Button, PrimengModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  user: User = {
    username: '',
    password: ''
  }

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  login() {
    if (!this.user.username || !this.user.password) return;

    this.user.username = this.user.username.trim();
    this.user.password = this.user.password.trim();

    this.userService.login(this.user).subscribe({
      next: (response: User) => {
        console.log(response);
        this.userService.saveToLocalStorage(response);
        this.router.navigate(['/']);
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

}
