import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPencil, faXmark } from '@fortawesome/free-solid-svg-icons'; 
import { FormDataService } from '../form-data.service';


@Component({
  selector: 'app-autocomplete',
  imports: [CommonModule,ReactiveFormsModule,FormsModule,FontAwesomeModule],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.css'
})
export class AutocompleteComponent {
faXmark = faXmark; 
faPencil = faPencil;
  constructor(private formDataService: FormDataService ) {}

  
  

}
