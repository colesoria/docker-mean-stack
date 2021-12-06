import { Component } from '@angular/core';
import { PostService } from 'src/modules/post/services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormControl, FormBuilder, Form } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Post } from 'src/modules/post/models/post';

@Component({
  selector: 'post-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss']
})

export class PostFormPage {
	public id: number|null;
	public post: Post;
	public loading: boolean = false;

	public form:FormGroup = new FormGroup({
		title: new FormControl(null, Validators.required),
		body: new FormControl(null, Validators.required),
		user: new FormControl(null, Validators.required),
	});

   	constructor(
		private _post: PostService,
		private router: Router,
		private route: ActivatedRoute,
		private _snackBar: MatSnackBar) {
			this.id = Number(this.route.snapshot.paramMap.get('idcamera'));
		}
  
  	public ngOnInit() {
		if (this.id){
			this._post.get(this.id).subscribe((post: Post) => {
				this.post = new Post(post);	
				this.initForm(post);	
			}, error => {
			}); 
		}else{
			this.initForm(null);
		}
	} 
	
    private initForm(data) {
		if(data) {
			this.form.patchValue({
				title: data.title,
				body: data.body,
				userId: data.userId,
			});           
		}
    }
	public create(){
		if (this.form.invalid) return null;
		this.loading = true;
      	this._post.create(this.form.value).subscribe((post:Post) => {
			const id = post.id;
			this.openSnackBar("Post creado correctamente");
			this.router.navigateByUrl('/');
			this.loading = false;
		}, error => {
			let msj = JSON.stringify(error.error.data);
			this.openSnackBar(msj.substr(2,msj.length-3));
			this.loading = false;          
		});  
	}

	public update(){
		if (this.form.invalid) return null;
		let form = this.form.getRawValue();
		this.loading = true;
		let data: Post = new Post(this.form.value);
		data.id = this.id;
        this.form.value.id = this.id;
		this._post.update(this.form.value).subscribe((post:Post) => {
			this.openSnackBar("Post actualizado correctamente");
			this.router.navigateByUrl('/');
			this.loading = false;
		}, error => {
			let msj = JSON.stringify(error.error.data);
			this.openSnackBar(msj.substr(2,msj.length-3));
			this.loading = false;          
		});  
	}

	public openSnackBar(message: string) {
		this._snackBar.open(message,'', {
		  duration: 1500,
		});
	}	
}
