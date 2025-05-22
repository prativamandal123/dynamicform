import { TextFieldComponent } from './../text-field/text-field.component';
import { Component } from '@angular/core';
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
  fieldPalette = [
    { type: 'autocomplete', label: 'Autocomplete' },
    { type: 'text', label: 'Text Field' },
  ];

  formFields: { id: string; type: string; label: string;  value?: any; // Add this
 }[] = [];
  
  trackByFieldPalette(index: number, item: { type: string }) {
    return item.type;
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
    value: ''
  };
  const insertIndex = event.currentIndex ?? this.formFields.length;
  this.formFields.splice(insertIndex, 0, newField);
}


}
