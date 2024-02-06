import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';

import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReservationPopupComponent } from '../reservation-popup/reservation-popup.component';


  
export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'service-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'] , 
  standalone : true , 
  imports: [CommonModule, SharedModule  , NgOptimizedImage , MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  encapsulation: ViewEncapsulation.None 
})
export default class DetailComponent {
  animal: string;
  name: string;
  constructor(public dialog:MatDialog
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(ReservationPopupComponent, {
      panelClass: 'custom-dialog' , 
      data: {name: this.name, animal: this.animal},
     
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

 


}

