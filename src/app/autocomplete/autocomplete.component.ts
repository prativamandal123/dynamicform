import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPencil, faXmark } from '@fortawesome/free-solid-svg-icons'; 


@Component({
  selector: 'app-autocomplete',
  imports: [CommonModule,ReactiveFormsModule,FormsModule,FontAwesomeModule],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.css'
})
export class AutocompleteComponent {
faXmark = faXmark; 
faPencil = faPencil;
  formModel = {
    autocomplete: '',
    required: false,
    label: '',
    helpText: '',
    placeholder: '',
    className: '',
    name: '',
    access: false,
    roles: {
      admin: false,
      editor: false,
      viewer: false,
    }
  };
  onSubmit() {
    console.log('Form submitted:', this.formModel);
  }

}
