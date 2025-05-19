export interface Form {
   
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
}


