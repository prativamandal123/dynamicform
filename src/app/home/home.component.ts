import { TextFieldComponent } from './../text-field/text-field.component';
import { Component, EventEmitter, Output } from '@angular/core';
import {  CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { AutocompleteComponent } from '../autocomplete/autocomplete.component';
import { CommonModule } from '@angular/common';
import { faPencil, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DragDropModule,ReactiveFormsModule,FormsModule,FontAwesomeModule,HttpClientModule,AutocompleteComponent,TextFieldComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  faPencil = faPencil;
   faXmark = faXmark;
   showForm = false;
   editedField: any = null; // the field currently being edited


  fieldPalette = [
    { type: 'autocomplete', label: 'Autocomplete' },
    { type: 'text', label: 'Text Field' },
  ]; //sidebar contant add 

 formFields: { id: string; type: string; label: string; value?: any; editing?: boolean }[] = [];

  
toggleForm(field: any, action: 'open' | 'close') {
  if (action === 'open') {
    this.editedField = field;
    this.showForm = true;
  } else {
    this.editedField = null;
    this.showForm = false;
  }
}





  displayContent(field: any) {
  const newField = {
    id: crypto.randomUUID(),
    type: field.type,
    label: field.label,
    value: '',
  };
  this.formFields.push(newField);
}


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
