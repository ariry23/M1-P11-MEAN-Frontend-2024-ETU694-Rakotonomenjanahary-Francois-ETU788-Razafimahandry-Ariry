import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { NgxFileDropEntry, NgxFileDropModule } from 'ngx-file-drop';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SERVICE_MANAGEMENT_AJOUT } from 'src/app/constants/api.constant';
import { ApiService } from 'src/app/core/services/api.service';
import { AjoutComponent } from 'src/app/demo/ui-elements/modal/ajout/ajout.component';

@Component({
  selector: 'app-ajout-service',
  templateUrl: './ajout-service.component.html',
  styleUrls: ['./ajout-service.component.scss'] , 
  standalone: true, 
  imports: [MatIconModule, CommonModule , ReactiveFormsModule , DragDropModule , NgxFileDropModule , NgxSpinnerModule]
})
export class AjoutServiceComponent extends AjoutComponent {
  public files: NgxFileDropEntry[] = [];
  public file: any = null; 
  reservationModalRef: MdbModalRef<any> | null = null;  
  /*Movies = [
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
  ];*/

  constructor(public override modalRef: MdbModalRef<AjoutServiceComponent> , public override apiService : ApiService , 
  
  public override toastrService : ToastrService , public formBuilder : FormBuilder)
  {
    super(modalRef , apiService , toastrService ,  SERVICE_MANAGEMENT_AJOUT) ; 
  }
  
  override buildForm(): void {
    this.form = new FormGroup({
          nom: new FormControl('', Validators.required),
          commission: new FormControl(null, Validators.required),
          duree: new FormControl(null, Validators.required),
          prix: new FormControl(null, Validators.required) , 
          image : new FormControl(null , Validators.required)
    });
  }

  /*Function for drag and drop file*/ 
  
  /*drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.Movies, event.previousIndex, event.currentIndex);
  } */ 
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
   //this.file = files[0];
    
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          // Here you can access the real file
          this.file = file;
          this.form.get('image').setValue(this.file);
          console.log(this.form.value);
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

  override save() {
    console.log(this.form.value);
    let data : any = this.form.value ; 
    let formData: FormData = new FormData();
    formData.append('files', this.file, this.file.name);
    formData.append('nom', data.nom);
    formData.append('prix', data.prix);
    formData.append('commission', data.commission);
    formData.append('duree' , data.duree);
    formData.append('fileName' , this.file.name);
   // image : req.body.image


    /*formData.append("nom" , data.nom) ; 
    formData.append("prix" , data.prix) ; 
    formData.append("commission" , data.commission ) ; 
    formData.append("duree" ,  data.duree ) 
    formData.append("description" , data.description ) 
    formData.append("image" , data.image ) ; */
    this.apiService.postData(this.apiUrl ,formData).subscribe(
      res => {
        this.modalRef.close();
        this.ajoutSuccess.emit();
      },
      err => {
          this.toastrService.error(err.message); 
      }
    );
  }
}
