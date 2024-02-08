import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerGuard } from 'src/app/guards/customer.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'historique',
        canActivate: [CustomerGuard],
        loadComponent: () => import('./historique/historique.component') 
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RendezVousRoutingModule {}
