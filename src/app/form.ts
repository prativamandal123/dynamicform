// models/form-field.model.ts
export interface FormField {
  id: string;
  type: string;
  label: string;
  value?: any;
  required?: boolean;
  placeholder?: string;
  helpText?: string;
  className?: string;
  name?: string;
  access?: boolean;
  roles?: {
    admin: boolean;
    editor: boolean;
    viewer: boolean;
  };
}


export interface FormRow {
  label: string;
  type: any;
  id: string;
    value?: any; // Add this

  formModel: FormField[];
}
export interface FieldType {
  type: string;
  label: string;
   id: string;

  value?: any; // Add this line
}


