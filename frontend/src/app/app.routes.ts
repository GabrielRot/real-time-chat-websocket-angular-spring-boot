import { Routes } from '@angular/router';
import { LoginComponent } from 'app/auth/login/login.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Chat App',
    loadChildren: () => import('app/features/user/user.module').then(m => m.UserModule)
  },
  {
    path: 'login',
    title: 'Login',
    component: LoginComponent
  }
];
