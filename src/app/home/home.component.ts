import { Component } from '@angular/core';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { AutocompleteComponent } from '../autocomplete/autocomplete.component';
import { CommonModule } from '@angular/common';
import { faPencil, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { FormDataService } from '../form-data.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DragDropModule, AutocompleteComponent,CommonModule,ReactiveFormsModule,FormsModule,FontAwesomeModule,HttpClientModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  fieldPalette = [
    { type: 'autocomplete', label: 'Autocomplete' },
    { type: 'text', label: 'Text Field' },
  ];

  formFields: { id: string; type: string; label: string;  value?: any; // Add this
 }[] = [];
  selectedContent: string | null = null;


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

  displayContent(contentName: string): void {
    this.selectedContent = contentName;
  }

  trackByFieldPalette(index: number, item: { type: string }) {
    return item.type;
  }

  trackByFormField(index: number, item: { id: string }) {
    return item.id;
  }
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
