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
 


  constructor(private formDataService: FormDataService ) {}

  
    ngOnInit(): void {
    this.formDataService.getFormModel().subscribe((data: any) => {
      this.formModel = Array.isArray(data.formModel) ? data.formModel[0] : data.formModel;
    });
  }
 


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


}
