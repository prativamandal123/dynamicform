import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPencil, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FormDataService } from '../form-data.service';

@Component({
  selector: 'app-text-field',
 imports: [CommonModule,ReactiveFormsModule,FormsModule,FontAwesomeModule,HttpClientModule,DragDropModule],
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.css'] 
})
export class TextFieldComponent {
 
  

  formModel: any;
  @Input() showForm: boolean = false;
  @Input() editedField: any = null;

  constructor(private formDataService: FormDataService) {}
  

    ngOnInit(): void {
    // You need the row ID to get the model.
    const rowId = this.formDataService.getRows()[0]?.id; // or pass it dynamically
    if (rowId) {
      this.formModel = this.formDataService.getFormModel(rowId);

    } else {
      console.warn('No row ID found in FormDataService.');
    }
  }
  





 
onSubmit(){}
 
 

}
