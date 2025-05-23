import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPencil, faXmark } from '@fortawesome/free-solid-svg-icons'; 
import { FormDataService } from '../form-data.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {CdkDragDrop, DragDropModule} from '@angular/cdk/drag-drop'


@Component({
  selector: 'app-autocomplete',
    standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,FontAwesomeModule,HttpClientModule,DragDropModule],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.css'
})
export class AutocompleteComponent {
  
faPencil = faPencil;
 faXmark = faXmark;
   showForm = true;
  formModel: any;
    
  constructor(private formDataService: FormDataService ) {}
   
  ngOnInit(): void {
    this.formDataService.getFormModel().subscribe((data: any) => {
      this.formModel = Array.isArray(data.formModel) ? data.formModel[0] : data.formModel;
    });
  }
 
  onSubmit(){}
 


}

