import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'] ,
  standalone: true
})



export class EditComponent {
  constructor(public modalRef: MdbModalRef<EditComponent>) {}
}
