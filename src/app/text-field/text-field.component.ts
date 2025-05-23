import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
export class TextFieldComponent implements OnInit {
 
  
 @Input() showForm: boolean = false;
  @Input() editedField: any = null;


  formModel: any;

  ngOnInit(): void {
    // Use the passed editedField or create a new object
    this.formModel = this.editedField || {};

    // Initialize roles to avoid undefined error
    if (!this.formModel.roles) {
      this.formModel.roles = {
        admin: false,
        editor: false,
        viewer: false
      };
    }
  }
  onSubmit() {}
}
 
 


