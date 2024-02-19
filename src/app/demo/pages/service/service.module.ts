import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceRoutingModule } from './service-routing.module';
import { MatDialogContent } from '@angular/material/dialog';
import { AjoutServiceComponent } from './management/ajout-service/ajout-service.component';
import { EditServiceComponent } from './management/edit-service/edit-service.component';


@NgModule({
  declarations: [
  ],
  imports: [
    
    CommonModule , 
    ServiceRoutingModule
  ]
})
export class ServiceModule { }
