import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Injectable, OnInit, Optional, Output } from '@angular/core';
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
  @Output() deleteSuccess: EventEmitter<void> = new EventEmitter<void>();
  data: any | null = null  ; 
  constructor(public modalRef: MdbModalRef<DeleteConfirmationComponent> , private apiService : ApiService , private toastrService : ToastrService) {
  }
  ngOnInit(): void {
    //console.log(this.data) ; 
  }
  
  delete() {
    this.apiService.deleteData(this.data.apiUrl).subscribe(
      res => {
        this.modalRef.close();
        this.deleteSuccess.emit();
      },
      err => {
          this.toastrService.error(err.message); 
      }
    );
  }
}
