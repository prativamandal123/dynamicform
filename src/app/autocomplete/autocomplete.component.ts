import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPencil, faXmark } from '@fortawesome/free-solid-svg-icons'; 
import { FormDataService } from '../form-data.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {CdkDragDrop, DragDropModule} from '@angular/cdk/drag-drop'


@Component({
  selector: 'app-autocomplete',
    standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,FontAwesomeModule,HttpClientModule,DragDropModule],
  templateUrl: './autocomplete.component.html',
styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent {
  


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
  

  onSubmit() {
    // handle form submission
  }
 


}
