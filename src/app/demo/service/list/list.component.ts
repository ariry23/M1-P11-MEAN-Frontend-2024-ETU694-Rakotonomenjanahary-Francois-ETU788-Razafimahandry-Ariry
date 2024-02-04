import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone : true , 
  imports: [CommonModule, SharedModule  , NgOptimizedImage],
})
export default class ListComponent {
  isMouseOver: boolean = false;
  onMouseOver(): void {
    this.isMouseOver = true;
  }

  onMouseLeave(): void {
    this.isMouseOver = false;
  }
}
