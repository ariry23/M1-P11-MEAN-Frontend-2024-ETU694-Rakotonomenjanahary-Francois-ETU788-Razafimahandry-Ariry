import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { CarRoutingModule } from '../car-routing.module';

@Component({
  selector: 'car-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule],
  
  
})
export default class ListComponent {

}
