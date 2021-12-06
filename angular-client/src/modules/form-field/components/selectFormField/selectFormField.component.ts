import { Component, Input, Output, EventEmitter, SimpleChanges, ViewChild, ElementRef, AfterViewInit  } from '@angular/core';
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
  selector: 'form-field-select',
  templateUrl: './view.component.html',
  styleUrls: ['./styles.component.scss']
})

export class SelectformFieldComponent implements AfterViewInit {
	@Input() fieldData: FormField;
	@Input() formGroup: FormGroup;
	@Input() isLoading: boolean = false;
	@Input() isRecomendation: boolean = false;
	@Input() panelOpen: boolean = false;
	@Output() onChangeField: EventEmitter<any> = new EventEmitter<any>();

	@ViewChild('select') select;

  	constructor(
	  ) {		  
  	}
  
  	public ngOnInit() {
	}
	ngAfterViewInit(){
		if(this.isRecomendation)
			this.select.open();
	}
	public ngOnChanges(changes: SimpleChanges): void {
	}
	public onChange(){
		this.onChangeField.emit(this.formGroup);
	}

	matcher = new SelectErrorStateMatcher();
}
