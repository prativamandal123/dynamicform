import { Injectable, Type } from '@angular/core';
   const TEXT_FIELD_DEFINTION = {
    Type:'text',
    label:'text_fild',
     defaultConfig:{
    label:'Text Fild',
    required:false
     }

   }

@Injectable({
  providedIn: 'root'
})
export class FieldTypeService {
  type: any;
  label: string | undefined;

}
