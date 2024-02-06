import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceRoutingModule } from './service-routing.module';
import { ReservationPopupComponent } from './reservation-popup/reservation-popup.component';


@NgModule({
  declarations: [
    ReservationPopupComponent,
  ],
  imports: [
    CommonModule , 
    ServiceRoutingModule
  ]
})
export class ServiceModule { }
