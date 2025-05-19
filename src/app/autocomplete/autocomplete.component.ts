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
  
faPencil = faPencil;
  faXmark = faXmark;

  // Flag to control visibility of additional form fields
  showForm = false;

  // Method to toggle visibility
  toggleForm(action: 'open' | 'close') {
    this.showForm = action === 'open';
  }

  // Model for form data
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
      viewer: false
    }
  };

  // Handle form submission
  onSubmit() {
    console.log('Form submitted', this.formModel);
  }
}
