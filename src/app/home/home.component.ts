import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { AutocompleteComponent } from '../autocomplete/autocomplete.component';
import { TextFieldComponent } from '../text-field/text-field.component';
import { faPencil, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FormField } from '../form';
import { FormDataService } from '../form-data.service';




@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule,
    AutocompleteComponent,
    TextFieldComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  faPencil = faPencil;
   faXmark = faXmark;
   showForm = false;
   editedField: any = null; // the field currently being edited
  currentEditingFieldId: string | null = null;
formEditState: { [fieldId: string]: boolean } = {}; // Track which fields have open config forms



    formFields: FormField[] = [];
    jsonOutput: string | null = null;
  selectedField: FormField | null = null;

  constructor(private formDataService: FormDataService) {}

  
  fieldPalette = [
    { type: 'autocomplete', label: 'Autocomplete' },
    { type: 'text', label: 'Text Field' },
  ];

  

  fieldTemplates: { [key: string]: Partial<FormField> } = {};

  ngOnInit(): void {
    this.formDataService.getTemplates().subscribe({
      next: (templates) => {
        this.fieldTemplates = templates;
      },
      error: (err) => {
        console.error('Failed to load templates:', err);
      }
    });
  }
  
toggleForm(field: any, action: 'open' | 'close') {
  if (action === 'open') {
    this.formEditState[field.id] = true;
      console.log('Toggling form for:', field.id, 'action:', action);

  } else if (action === 'close') {
    this.formEditState[field.id] = false;
  }
}

  displayContent(field: { type: string; label: string }) {
    
    const template = this.fieldTemplates[field.type] || {};
    const newField: FormField = {
      id: crypto.randomUUID(),
      type: field.type,
      label: field.label,
      autocomplete: template.autocomplete || '',
      required: template.required || false,
      helpText: template.helpText || '',
      placeholder: template.placeholder || '',
      className: template.className || '',
      name: template.name || '',
      access: template.access || false,
      roles: template.roles || { admin: false, editor: false, viewer: false },
      value: '',
      defaultConfig: template.defaultConfig || {},
      showHtml: false
    };
    this.formFields.push(newField);
  }

  // onDropInRow(event: CdkDragDrop<any>) {
fields = [
    {
      id: 'autocomplete1',
      type: 'autocomplete',
      label: 'Country',
      // autocomplete model data here
    },
    {
      id: 'text1',
      type: 'text',
      label: 'Username',
      required: true,
      placeholder: 'Enter username',
      // text field model data here
    }
  ];




 onDropInRow(event: CdkDragDrop<any>) {
    const draggedField = event.item.data;
    if (!draggedField?.type) return;

    const template = this.fieldTemplates[draggedField.type] || {};
    const newField: FormField = {
      id: crypto.randomUUID(),
      type: draggedField.type,
      label: draggedField.label,
      autocomplete: template.autocomplete || '',
      required: template.required || false,
      helpText: template.helpText || '',
      placeholder: template.placeholder || '',
      className: template.className || '',
      name: template.name || '',
      access: template.access || false,
      roles: template.roles || { admin: false, editor: false, viewer: false },
      value: '',
      defaultConfig: template.defaultConfig || {},
      showHtml: false,
    };

    this.formFields.splice(event.currentIndex, 0, newField);
  }

  

  deleteField(fieldToDelete: FormField) {
    this.formFields = this.formFields.filter(field => field.id !== fieldToDelete.id);
    if (this.selectedField?.id === fieldToDelete.id) {
      this.selectedField = null;
      this.editedField = null;
      this.showForm = false;
    }
  }

  selectField(field: FormField) {
    this.selectedField = field;
  }

  generateJSON() {
    this.jsonOutput = JSON.stringify(this.formFields, null, 2);
  }

  trackByFieldPalette(index: number, item: { type: string }) {
    return item.type;
  }

  trackByFormField(index: number, item: { id: string }) {
    return item.id;
  }
editField(fieldId: string) {
    if (this.currentEditingFieldId === fieldId) {
      // toggle off if clicking same field again
      this.currentEditingFieldId = null;
    } else {
      this.currentEditingFieldId = fieldId;
    }
  }



}
