import { AfterViewInit, QueryList, ViewChildren } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { PostService } from 'src/modules/post/services/post.service';
import { UserService } from 'src/modules/post/services/user.service';
import { MatSort } from '@angular/material/sort';
import { Post } from 'src/modules/post/models/post';
import { User } from 'src/modules/post/models/user';
import { Comment } from 'src/modules/post/models/comment';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Sort } from '@angular/material/sort';
import { MatInput } from '@angular/material/input';
import { MatCheckbox } from '@angular/material/checkbox';
import { from } from 'rxjs';
import { concatMap } from 'rxjs/operators';

import { PostStore } from 'src/modules/post/stores/post.store';
import { UserStore } from 'src/modules/post/stores/user.store';

@Component({
  selector: 'post-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss']
})

export class PostListPage implements AfterViewInit{

	@ViewChild(MatSort) sort: MatSort;
    @ViewChildren('table') table: QueryList<MatCheckbox>
    @ViewChild(MatInput) input: MatInput;

	ngAfterViewInit() {
		this.dataSource.sort = this.sort;
	}

	public displayedColumns: string[] = ['id', 'title', 'author'];
	public selection = new SelectionModel<Post>(true, []);
	public dataSource = new MatTableDataSource<Post>();
	public new: boolean = false;
	public edit: boolean = false;
	public deleted: boolean = false;
	public load: boolean = true;
	public sortedData: Post[] = [];
    public data: Post[] = [];
	public users: User[] = [];
	public all = true;
	public posts: Post[] = [];

	public selectedPost:Post;

	constructor(
		private postStore: PostStore,
		private userStore: UserStore,
		private _post: PostService,
		private _user: UserService,
		private _snackBar: MatSnackBar,
		private router: Router
	) {
		this.postStore.onChange.subscribe(posts => {
			if(posts){
				this.posts = posts.map(p => new Post(p));
			}
		})
		this.userStore.onChange.subscribe(users => {
			if(users){
				this.users = users.map(u => new User(u));
			}
		})
	}
  
  	public ngOnInit() {
		this.posts.map(p => {
			let data:any = p;
			data.user =  this.users.filter(u => u.id === p.userId)[0];
			this.data.push(data);
		})
		this.data = this.posts;
		this.selectPost(this.data[0].id);
		this.renderDataTable(this.posts);
	}


	  
	public renderDataTable(data: Post[]) {
		this.dataSource = new MatTableDataSource(data);	
        this.render(data);
	}

	public render(data:any){
		this.sortedData = data.slice();
		this.posts = data;
		this.dataSource.sort = this.sort;
		this.load = false;
	}
	
	public delete(id:number){
		this.load = true;
		this._post.delete(id).subscribe(res => {
			this.openSnackBar("El post se ha eliminado correctamente");
			this.posts.map((p,i) => {
				if(p.id === id)
					this.posts.splice(i,1);
			});
			this.postStore.set(this.posts);
			this.load = false;
			this.selectPost(this.posts[0].id);
		}, error => {
			this.openSnackBar("El post no se ha eliminado correctamente");
			this.load = false;
		});
	}

	public update(){
		this.router.navigateByUrl('/post/edit/'+this.selection.selected[0].id);
	}

	public openSnackBar(message: string) {
		this._snackBar.open(message,'', {
		  duration: 1500,
		});
	}

	
	public goToDetail(row: any){
		this.router.navigateByUrl(`/post/${row.id}`);
	}
	
	sortData(sort: Sort) {
		const data = this.dataSource.data.slice();
		if (!sort.active || sort.direction === '') {
		  this.sortedData = data;
		  return;
		}
	
		this.sortedData = data.sort((a, b) => {
		  const isAsc = sort.direction === 'asc';
		  switch (sort.active) {
			case 'id': return this.compare(a.id, b.id, isAsc);
			case 'title': return this.compare(a.title, b.title, isAsc);
			case 'author': return this.compare(a.userId, b.userId, isAsc);
			default: return 0;
		  }
		});
		this.dataSource.data = this.sortedData;
	}
	
	compare(a: number | string, b: number | string, isAsc: boolean) {
	  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
	}

	public selectPost(id:number){
		this.selectedPost = this.data.filter(p => p.id === id)[0];
		this.getComments(id);
	}


	private getComments(id:number){
		this._post.getComments(id).subscribe((comments: Comment[]) => {
			this.selectedPost.comments = comments.map(c => new Comment(c));
		});
	}
	public filterByUser(userId:number){
		let data:Post[] =[];
		if(userId !== 0)
			data = this.data.filter(p => p.userId === userId);
		else
			data = this.data;

		this.renderDataTable(data);
	}
}
