import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPencil, faXmark } from '@fortawesome/free-solid-svg-icons'; 
import { FormDataService } from '../form-data.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-autocomplete',
    standalone: true,  // add this if you want standalone component

  imports: [CommonModule,ReactiveFormsModule,FormsModule,FontAwesomeModule,HttpClientModule],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.css'
})
export class AutocompleteComponent {
  
faPencil = faPencil;
 faXmark = faXmark;
   showForm = false;
  formModel: any;
 


  constructor(private formDataService: FormDataService ) {}

  
    ngOnInit(): void {
    this.formDataService.getFormModel().subscribe((data: any) => {
      // If the data is an array (like in your JSON), get the first item
      this.formModel = Array.isArray(data.formModel) ? data.formModel[0] : data.formModel;
    });
  }
 

  // Flag to control visibility of additional form fields

  // Method to toggle visibility
  toggleForm(action: 'open' | 'close') {
    this.showForm = action === 'open';
  }
onSubmit(){}
 

}
