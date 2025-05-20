export interface FormField {
  id: string;
  type: any;
    value?: any; // Add this line

  autocomplete: string;
  required: boolean;
  label: string;
  helpText: string;
  placeholder: string;
  className: string;
  name: string;
  access: boolean;
  roles: {
    admin: boolean;
    editor: boolean;
    viewer: boolean;
  };
    defaultConfig:any;

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


