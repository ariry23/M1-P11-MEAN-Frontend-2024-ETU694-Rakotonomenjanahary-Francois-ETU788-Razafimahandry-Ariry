import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { CustomerGuard } from './guards/customer.guard';
import { LoggedOutGuard } from './guards/logged-out.guard';
import { AuthGuard } from './guards/auth.guard';
import { MainGuard } from './guards/main.guard';
import { EmployeeGuard } from './guards/employee-guard';
import { AdminGuard } from './guards/admin.guard';
let test = "test" ; 
const routes : Routes = [
  {
    //canActivateChild: [AuthGuard] , 
    path: '',
    component: AdminComponent,
    canActivateChild: [AuthGuard] , 
    children: [
      {
        path: '',
        redirectTo: window.localStorage.getItem("mainRoute") === null ? '/auth/signin' : window.localStorage.getItem("mainRoute"),
        canActivateChild: [MainGuard] , 
        pathMatch: 'full',
      },
      {
        path: 'service',
        loadChildren: () =>
          import('./demo/pages/service/service.module').then(
            (m) => m.ServiceModule,
          ),
      } , 
      {
        path: 'rendez-vous',
        loadChildren: () =>
          import('./demo/pages/rendez-vous/rendez-vous.module').then(
            (m) => m.RendezVousModule,
          ),
      } , 
      {
        path: 'account',
        loadComponent: () =>
          import('./demo/pages/account/account.component')
      },
      {
        path: 'profil-horaire',
        canActivate: [EmployeeGuard] ,
        loadComponent: () =>
          import('./demo/pages/profil-horaire/profil-horaire.component')
      },
      {
        path: 'personnel',
        canActivate: [AdminGuard] , 
        loadComponent: () =>
          import('./demo/pages/personnel/personnel.component')
      },
      {
        canActivate: [AuthGuard] , 
        path: 'user/dashboard',  
        loadComponent: () => import('./demo/chart/apex-chart/apex-chart.component'),
      },
      {
        canActivate: [AdminGuard] , 
        path: 'user/dashboard-benefice',  
        loadComponent: () => import('./demo/pages/dashboard-benefice/dashboard-benefice.component'),
      },
      {
        canActivate: [EmployeeGuard] , 
        path: 'user/task-list',  
        loadComponent: () => import('./demo/pages/task-list/task-list.component'),
      },
    ],
  } , {
    path: 'auth',
    component: GuestComponent,
   
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./demo/pages/authentication/authentication.module').then(
            (m) => m.AuthenticationModule,
          ),
      },
    ],
  },

];



/*
const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        canActivate: [AuthGuard] , 
        path: 'dashboard',  
        loadComponent: () => import('./demo/dashboard/dashboard.component'),
      },
      {
        path: 'basic',
        loadChildren: () =>
          import('./demo/ui-elements/ui-basic/ui-basic.module').then(
            (m) => m.UiBasicModule,
          ),
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./demo/pages/form-elements/form-elements.module').then(
            (m) => m.FormElementsModule,
          ),
      },
      {
        path: 'tables',
        loadChildren: () =>
          import('./demo/pages/tables/tables.module').then(
            (m) => m.TablesModule,
          ),
      },
      {
        path: 'apexchart',
        loadComponent: () =>
          import('./demo/chart/apex-chart/apex-chart.component'),
      },
      {
        path: 'sample-page',
        loadComponent: () =>
          import('./demo/extra/sample-page/sample-page.component'),
      },
      {
        path: 'product',
        loadComponent: () =>
          import('./demo/product/list/list.component'),
      },
      {
        path: 'service',
        loadChildren: () =>
          import('./demo/service/service.module').then(
            (m) => m.ServiceModule,
          ),
      },
      {
        path: 'car',
        loadChildren: () =>
          import('./demo/car/car.module').then(
            (m) => m.CarModule,
          ),
      },
      {
        path: 'account',
        loadComponent: () =>
          import('./demo/account/account.component')
      },
    ],
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () =>
          import('./demo/pages/authentication/authentication.module').then(
            (m) => m.AuthenticationModule,
          ),
      },
    ],
  },
]; */ 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
