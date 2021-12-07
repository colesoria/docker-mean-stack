import { Component, OnInit, Input,Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormControl, FormBuilder, FormGroup} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/modules/post/models/user';
import { UserService } from 'src/modules/post/services/user.service';
import { FormField } from 'src/modules/form-field/models/form-field';

@Component({
  selector: 'post-user-select',
  templateUrl: './user-select.component.html',
  styleUrls: ['./user-select.component.scss']
})
export class PostUserSelectComponent implements OnInit {

	@Output() onSelected = new EventEmitter<number>();
	@Input() selected: number;
	@Input() required: boolean = false;

	public loadingUsers:boolean = false;

	public fieldDataUser: FormField = {
		label: "Autor",
		name: 'user',
		placeholder: 'Filtra por autor',
		options: [],
		multiple:false,
		required: this.required
	};

	public users:User[] = [];

	public formGroup:FormGroup = new FormGroup({
		user: new FormControl('')
	});

  	constructor(
		private _snackBar: MatSnackBar,
		private _user: UserService
	) {	
    }

	ngOnInit(): void {
		this.getUsers();
    }
  
	private getUsers(){
		this.loadingUsers = true;
		this.fieldDataUser.options = [];
		this._user.list().subscribe((users: User[]) => {
			if(users) {
				this.users = users.map(u => new User(u));
				this.users.map(u => {
					this.fieldDataUser.options!.push({value: u.id, name: u.name});
				});
			}
			this.loadingUsers = false;
		}, error => {
			this.loadingUsers = false;
		}); 
	}  

	ngOnChanges(changes: SimpleChanges): void {
		//Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
		//Add '${implements OnChanges}' to the class.
		if(changes['selected'] && changes['selected'].currentValue)
			this.formGroup.patchValue({user: changes['selected'].currentValue});
	}
	public userChanged(){
		const user = this.formGroup.get('user')!.value;
		if(user)
			this.onSelected.emit(user);
	}
	public openSnackBar(message: string) {
		this._snackBar.open(message,'', {
		  duration: 1500,
		});
	}
}
