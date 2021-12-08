import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormGroup, NgForm, FormGroupDirective } from '@angular/forms';
import { FormField } from 'src/modules/form-field/models/form-field';
import {ErrorStateMatcher} from '@angular/material/core';

export class SelectErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
	  const isSubmitted = form && form.submitted;
	  return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
	}
}

@Component({
  selector: 'form-field-text-area',
  templateUrl: './view.component.html',
  styleUrls: ['./styles.component.scss']
})

export class TextAreaformFieldComponent {
	@Input() fieldData: FormField;
	@Input() formGroup: FormGroup;
	@Output() onChangeField: EventEmitter<any> = new EventEmitter<any>();

  	constructor() {	
  	}
  
  	public ngOnInit() {
	}

	public onChange(){
		this.onChangeField.emit(this.formGroup);
	}

	matcher = new SelectErrorStateMatcher();
}
