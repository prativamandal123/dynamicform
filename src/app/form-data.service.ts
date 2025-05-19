import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Form } from '@angular/forms';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FormDataService {

  constructor(private http: HttpClient) {}

  getFormModel(): Observable<Form> {
    return this.http.get<Form>('assets/formdata.json');
  }
}
