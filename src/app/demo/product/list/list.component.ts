import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxFileDropEntry, NgxFileDropModule } from 'ngx-file-drop';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'] , 
  standalone: true,
  imports: [CommonModule, SharedModule , DragDropModule , NgxFileDropModule , NgxSpinnerModule],
})
export default class ListComponent implements OnInit {
  private isLoading = new BehaviorSubject<boolean>(false);
  public files: NgxFileDropEntry[] = [];
  public loading$ = this.isLoading.asObservable();
  Movies = [
    'Blade Runner',
    'Cool Hand Luke',
    'Heat',
    'Juice',
    'The Far Side of the World',
    'Morituri',
    'Napoleon Dynamite',
    'Pulp Fiction'
  ];
  MoviesList = [
    'The Far Side of the World',
    'Morituri',
    'Napoleon Dynamite',
    'Pulp Fiction',
    'Blade Runner',
    'Cool Hand Luke',
    'Heat',
    'Juice'
  ];
  MoviesWatched = [
  ];
  constructor(private apiService: ApiService , private spinner: NgxSpinnerService){}
  ngOnInit() {
    this.showLoader();
      this.apiService.getData('https://dummyjson.com/products').subscribe(
      data => {
       // this.showLoader();
        this.spinner.show();
        let product = data.products ; 
        console.log(product) ; 
    
         
       },
      error => {
        
       },
       () => {
        //this.hideLoader();
        this.spinner.hide();
       }
    )
   
    
  }
  showLoader() {
    this.isLoading.next(true);
  }
  
  hideLoader() {
    this.isLoading.next(false);
  }
  
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.Movies, event.previousIndex, event.currentIndex);
  }
  onDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }  
  
  dropped(files: NgxFileDropEntry[]) {
    for(let file of files) {
      this.files.push(file);
    }
    
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log(droppedFile.relativePath, file);
          console.log('ato ee');
          console.log(this.files) ; 
          /**
          // You could upload it like this:
          const formData = new FormData()
          formData.append('logo', file, relativePath)

          // Headers
          const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })

          this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          .subscribe(data => {
            // Sanitized logo returned from backend
          })
          **/

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }


  fileOver(event){
    console.log('mandalo ato koa');
    console.log(event);
  }

  fileLeave(event){
    console.log('mandalo ato') ; 
    console.log(event);
    console.log(this.files.length) ; 
  }


}
