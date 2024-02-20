import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RendezVousRoutingModule } from './rendez-vous-routing.module';
import { PaiementComponent } from './paiement/paiement.component';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule , 
    RendezVousRoutingModule
  ]
})
export class RendezVousModule { }
