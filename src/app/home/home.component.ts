import { TextFieldComponent } from './../text-field/text-field.component';
import { Component } from '@angular/core';
import {  CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { AutocompleteComponent } from '../autocomplete/autocomplete.component';
import { CommonModule } from '@angular/common';
import { faPencil, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { FormField } from '../form';


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

  formFields: FormField[] = [];


  
  trackByFieldPalette(index: number, item: { type: string }) {
    return item.type;
  }
  //  onDropInRow(event: CdkDragDrop<any>) {
  //   const draggedField = event.item.data;
  //   if (!draggedField?.type) return;

  //   const newField = {
  //     id: crypto.randomUUID(),
  //     type: draggedField.type,
  //     label: draggedField.label,
  //   };
  //   this.formFields.splice(event.currentIndex, 0, newField);
  // }
 

  trackByFormField(index: number, item: { id: string }) {
    return item.id;
  }


  displayContent(field: any) {
  const newField = {
    id: crypto.randomUUID(),
    type: field.type,
    label: field.label,
    value: '',
  };
  this.formFields.push();
}
 

// createDefaultFormField(type: string): FormField {
//   return {
//     id: crypto.randomUUID(), // Or use uuidv4() if you're using that
//     type: type,
//     label: `${type} field`,
//     value: '',
//     autocomplete: '',
//     required: false,
//     helpText: '',
//     placeholder: '',
//     className: '',
//     name: '',
//     access: false,
//     options: [],
//     roles: {
//       admin: false,
//       editor: false,
//       viewer: false,
//     },
//     defaultConfig: {}
//   };
// }
// onFieldDrop(type: string) {
//   const newField = this.createDefaultFormField(type);
//   this.formFields.push(newField);
// }

defaultFormField: FormField = {
  id: '',
  type: '',
  value: '',
  autocomplete: '',
  required: false,
  label: '',
  helpText: '',
  placeholder: '',
  className: '',
  name: '',
  access: false,
  options: [],
  roles: {
    admin: false,
    editor: false,
    viewer: false
  },
  defaultConfig: {}
};

normalizeField(field: Partial<FormField>): FormField {
  return {
    ...this.defaultFormField,
    ...field,
    id: field.id || crypto.randomUUID()
  };
}


onDropInRow(event: CdkDragDrop<any>) {
  const dropped = event.item.data;
  
  const normalizedField = this.normalizeField({
    type: dropped.type,
    label: dropped.label || 'Label',
    name: dropped.name || 'name',
  });

  this.formFields.push(normalizedField);
}
}
