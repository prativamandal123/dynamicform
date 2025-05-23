import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormField, FormRow } from './form';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormDataService {
  private _rows = signal<FormRow[]>([
    {
      id: crypto.randomUUID(),
      label: '',
      type: undefined,
      formModel: [],
    },
  ]);
  readonly rows = this._rows.asReadonly();

  constructor(private http: HttpClient) {}

  getRows(): FormRow[] {
    return this.rows();
  }

  getFormModel(rowId: string): FormField[] | undefined {
    return this._rows().find(row => row.id === rowId)?.formModel;
  }

  addFormModel(field: FormField, rowId: string, index?: number): void {
    const updatedRows = this._rows().map(row => {
      if (row.id !== rowId) return row;

      const updatedFields = [...row.formModel];
      if (index !== undefined && index >= 0 && index <= updatedFields.length) {
        updatedFields.splice(index, 0, field);
      } else {
        updatedFields.push(field);
      }

      return { ...row, formModel: updatedFields };
    });

    this._rows.set(updatedRows);
  }
 

  getTemplates(): Observable<any> {
    return this.http.get('/assets/formdata.json');
  }


}
