import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerGuard } from 'src/app/guards/customer.guard';
import { EmployeeGuard } from 'src/app/guards/employee-guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'historique',
        canActivate: [CustomerGuard],
        loadComponent: () => import('./historique/historique.component') 
      } , 
      {
        path: 'liste',
        canActivate: [EmployeeGuard],
        loadComponent: () => import('./list/list.component') 
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RendezVousRoutingModule {}
