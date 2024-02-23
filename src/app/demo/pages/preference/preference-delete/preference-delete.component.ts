import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-preference-delete',
  templateUrl: './preference-delete.component.html',
  styleUrls: ['./preference-delete.component.scss'] , 
  standalone: true , 
  imports: [MatIconModule , CommonModule , MatDialogModule ]
})
export class PreferenceDeleteComponent implements OnInit {
  @Output() deleteSuccess: EventEmitter<void> = new EventEmitter<void>();
  data: any | null = null  ; 
  constructor(public modalRef: MdbModalRef<PreferenceDeleteComponent> , private apiService : ApiService , private toastrService : ToastrService) {
  }
  ngOnInit(): void {
    //console.log(this.data) ; 
  }
  
  delete() {
    this.apiService.deleteData("").subscribe(
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