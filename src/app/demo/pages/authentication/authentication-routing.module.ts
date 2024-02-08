import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedOutGuard } from 'src/app/guards/logged-out.guard';

const routes: Routes = [
  {
    path: '',
    canActivateChild : [LoggedOutGuard] , 
    children: [
      {
        path: 'signin',
        loadComponent: () => import('./auth-signin/auth-signin.component'),
      },
      {
        path: 'signup',
        loadComponent: () => import('./auth-signup/auth-signup.component'),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
