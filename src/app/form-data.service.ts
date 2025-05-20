import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Form } from '@angular/forms';
import { Observable } from 'rxjs';
import { FormField, FormRow } from './form';


@Injectable({
  providedIn: 'root'
})
export class FormDataService {
 private _rows = signal<FormRow[]>([]);
  private readonly rows = this._rows.asReadonly();

  constructor(private http: HttpClient) {
    this._rows.set([
      {
        id: crypto.randomUUID(),
        formModel: [],
        label: '',
        type: undefined
      }
    ]);
  }

  getRows(): FormRow[] {
    return this.rows();
  }

  addFormModel(field: FormField, rowId: string, index?: number): void {
    const updatedRows = this._rows().map(row => {
      if (row.id === rowId) {
        const updatedFields = [...row.formModel];
        if (index !== undefined && index >= 0 && index < updatedFields.length) {
          updatedFields.splice(index, 0, field);
        } else {
          updatedFields.push(field);
        }

        return {
          ...row,
          formModel: updatedFields
        };
      }
      return row;
    });

    this._rows.set(updatedRows);
  }
 
  getFormModel(): Observable<Form> {
    return this.http.get<Form>('assets/formdata.json');
  }


}
