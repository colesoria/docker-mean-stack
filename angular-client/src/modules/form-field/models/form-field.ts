interface option {
  name: string;
  value?: any;
  selected?: boolean;
  idcontent?:number;
  date_on?:string;
  code?:string;
  accept?:string;
  disabled?:boolean;
  hideTime?:boolean;
}

export class FormField {
  label: string;
  name: string;
  placeholder: string;
  options?: option[];
  multiple?: boolean;
  required: boolean;
  accept?:string;
  minDate?:string;
  maxDate?:string;
  disabled?:boolean;
  defaultTime?:string[];
  hideTime?:boolean;
    
  constructor(obj?: any) {
    if(!obj)
      return;

    this.label = obj.label;
    this.name = obj.name;
    this.placeholder = obj.placeholder;
    this.options = obj.options;
    this.multiple = obj.multiple;
    this.required = obj.required;
    this.accept = obj.accept;
    this.minDate = obj.minDate;
    this.maxDate = obj.maxDate;
    this.disabled = obj.disabled;
    this.defaultTime = obj.defaultTime;
    this.hideTime = obj.hideTime;
  }
}