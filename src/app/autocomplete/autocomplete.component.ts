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
    standalone: true,  // add this if you want standalone component

  imports: [CommonModule,ReactiveFormsModule,FormsModule,FontAwesomeModule,HttpClientModule,DragDropModule,AutocompleteComponent],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.css'
})
export class AutocompleteComponent {
  
faPencil = faPencil;
 faXmark = faXmark;
   showForm = false;
  formModel: any;
    

   fieldPalette = [
    { type: 'autocomplete', label: 'Autocomplete' },
    { type: 'text', label: 'Text Field' },
  ];

  formFields: { id: string; type: string; label: string;  value?: any; // Add this
 }[] = [];
 selectedContent: string | null = null;
 


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
 
 onDropInRow(event: CdkDragDrop<any>) {
    const draggedField = event.item.data;
    if (!draggedField?.type) return;

    const newField = {
      id: crypto.randomUUID(),
      type: draggedField.type,
      label: draggedField.label,
    };
    this.formFields.splice(event.currentIndex, 0, newField);
  }
  
  trackByFieldPalette(index: number, item: { type: string }) {
    return item.type;
  }

  trackByFormField(index: number, item: { id: string }) {
    return item.id;
  }
  displayContent(contentName: string): void {
    this.selectedContent = contentName;
  }
}
