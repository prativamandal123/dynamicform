import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPencil, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FormDataService } from '../form-data.service';

@Component({
  selector: 'app-text-field',
 imports: [CommonModule,ReactiveFormsModule,FormsModule,FontAwesomeModule,HttpClientModule,DragDropModule],
  templateUrl: './text-field.component.html',
  styleUrl: './text-field.component.css'
})
export class TextFieldComponent {
 
   showForm = false;
    formModel: any;
    

  constructor(private formDataService: FormDataService ) {}

  
    ngOnInit(): void {
    this.formDataService.getFormModel().subscribe((data: any) => {
      this.formModel = Array.isArray(data.formModel) ? data.formModel[0] : data.formModel;
    });
  }
 


 
onSubmit(){}
 
 

}
