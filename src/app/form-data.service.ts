import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {

  constructor(private http: HttpClient) {}

  getFormModel(): Observable<any> {
    return this.http.get('assets/data/form-model.json');
  }
}
