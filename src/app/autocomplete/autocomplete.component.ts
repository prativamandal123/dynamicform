import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
export class AutocompleteComponent implements OnInit {
  
 @Input() showForm: boolean = false;
  @Input() editedField: any = null;

  formModel: any;

  constructor(private formDataService: FormDataService) {}

  ngOnInit(): void {
    const rowId = this.formDataService.getRows()[0]?.id;

    if (rowId) {
      this.formModel = this.formDataService.getFormModel(rowId);
    } else {
      // fallback: if editedField passed in, use that
      this.formModel = this.editedField || {};
    }

    // Initialize roles if undefined to avoid runtime errors
    if (!this.formModel.roles) {
      this.formModel.roles = {
        admin: false,
        editor: false,
        viewer: false
      };
    }
  }
  onSubmit() {
    // handle form submit
  }


}
