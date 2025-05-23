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


  
  constructor(private formDataService: FormDataService) {}

  faPencil = faPencil;
  faXmark = faXmark;

  showForm = false;
  editedField: FormField | null = null;

  fieldPalette = [
    { type: 'autocomplete', label: 'Autocomplete' },
    { type: 'text', label: 'Text Field' },
  ];

  formFields: FormField[] = [];
  jsonOutput: string | null = null;
  selectedField: FormField | null = null;

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

  toggleForm(field: FormField, action: 'open' | 'close') {
    if (action === 'open') {
      this.editedField = field;
      this.showForm = true;
    } else {
      this.editedField = null;
      this.showForm = false;
    }
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




}
