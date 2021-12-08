import { Component } from '@angular/core';
import { PostService } from 'src/modules/post/services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormControl, FormBuilder, Form } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Post } from 'src/modules/post/models/post';
import { FormField } from 'src/modules/form-field/models/form-field';
import { PostStore } from 'src/modules/post/stores/post.store';
@Component({
  selector: 'post-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss']
})

export class PostFormPage {
	public id: number|null;
	public post: Post;
	public posts: Post[] = [];
	public loading: boolean = false;
	public all:boolean = false;
	public author:number = 0;
	public fieldDataTitle: FormField = {
		label: "Título",
		name: 'title',
		placeholder: 'Escribe un título',
		required: true
	};
	public fieldDataBody: FormField = {
		label: "Cuerpo del post",
		name: 'body',
		placeholder: 'Escribe el post',
		required: true
	};
	public fieldDataUser: FormField = {
		label: "Autor",
		name: 'userId',
		placeholder: 'Selecciona un autor',
		required: true
	};
	public form:FormGroup = new FormGroup({
		title: new FormControl(null, Validators.required),
		body: new FormControl(null, Validators.required),
		userId: new FormControl(null, Validators.required),
	});

   	constructor(
		private _post: PostService,
		private postStore: PostStore,
		private router: Router,
		private route: ActivatedRoute,
		private _snackBar: MatSnackBar) {
			this.id = Number(this.route.snapshot.paramMap.get('idpost'));
			this.postStore.onChange.subscribe(posts =>{
				if(posts)
					this.posts = posts.map(p => new Post(p));
			});
		}
  
  	public ngOnInit() {
		if (this.id){
			this._post.get(this.id).subscribe((post: Post) => {
				this.post = new Post(post);	
				this.initForm(post);	
			}, error => {
			}); 
		}else{
			this.initForm();
		}
	} 
	
    private initForm(data:any = null) {
		if(data) {
			this.form.patchValue({
				title: data.title,
				body: data.body,
				userId: data.userId,
			}); 
			this.author = data.userId;          
		}
    }
	public create(){
		if (this.form.invalid) return null;
		this.loading = true;
      	this._post.create(this.form.value).subscribe((post:Post) => {
			this.posts.push(post);
			this.postStore.set(this.posts);
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
        this.form.value.id = this.id;
		this._post.update(this.form.value).subscribe((post:Post) => {
			this.openSnackBar("Post actualizado correctamente");
			this.posts.map((p,i) => {
				if(p.id === post.id){
					this.posts[i] = post;
				}
			});
			this.postStore.set(this.posts);
			this.loading = false;
			this.router.navigateByUrl('/');
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
	public selectedAuthor(userId:number){
		this.form.patchValue({userId: userId})
	}
}
