import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/guards/admin.guard';
import { CustomerGuard } from 'src/app/guards/customer.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
       canActivate: [CustomerGuard] , 
        path: 'list',
        loadComponent: () => import('./list/list.component') 
      },
      {
        canActivate: [CustomerGuard] , 
        path: 'detail/:id',
        loadComponent: () => import('./detail/detail.component') 
      } , 
      {
        canActivate: [AdminGuard] , 
         path: 'management',
         loadComponent: () => import('./management/management.component') 
       },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceRoutingModule {}
