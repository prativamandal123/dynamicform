import { Component } from '@angular/core';
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
  showForm = true;

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
      defaultConfig: template.defaultConfig || {}
    };

    this.formFields.push(newField);
  }

  toggleForm(action: 'open' | 'close') {
    this.showForm = action === 'open';
  }

  onDropInRow(event: CdkDragDrop<any>) {
    const draggedField = event.item.data;
    if (!draggedField?.type) return;
    this.displayContent(draggedField);
  }

  trackByFieldPalette(index: number, item: { type: string }) {
    return item.type;
  }

  trackByFormField(index: number, item: { id: string }) {
    return item.id;
  }

  selectField(field: FormField) {
    this.selectedField = field;
  }

  generateJSON() {
    if (this.selectedField) {
      const template = this.fieldTemplates[this.selectedField.type] || {};
      const completeField = {
        ...template,
        ...this.selectedField
      };
      this.jsonOutput = JSON.stringify(completeField, null, 2);
    } else {
      this.jsonOutput = 'No field selected.';
    }
  }
}
