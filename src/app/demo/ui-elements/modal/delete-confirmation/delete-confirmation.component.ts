import { CommonModule } from '@angular/common';
import { Component, Inject, Injectable, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule  } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss'] , 
  standalone: true , 
  imports: [MatIconModule , CommonModule , MatDialogModule ]
})


@Injectable({
  providedIn: 'root'
})
export default class DeleteConfirmationComponent implements OnInit {
  apiUrl: string | null = null  ; 
  constructor(public modalRef: MdbModalRef<DeleteConfirmationComponent> , private apiService : ApiService , private toastrService : ToastrService) {
      //console.log(this.apiUrl) ; 
  }
  ngOnInit(): void {
  //  console.log(this.data) ;
  console.log(this.apiUrl) ; 
  }
  
  delete() {
    console.log(this.apiUrl) ;
    /*this.apiService.deleteData("test").subscribe(
      res => {
        this.modalRef.close();
      },
      err => {
          this.toastrService.error(err.message); 
      }
    );*/
  }
}
