import { AfterViewInit, QueryList, ViewChildren } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { PostService } from 'src/modules/post/services/post.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Post } from 'src/modules/post/models/post';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Sort } from '@angular/material/sort';
import { MatInput } from '@angular/material/input';
import { MatCheckbox } from '@angular/material/checkbox';
import { from } from 'rxjs';
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'post-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss']
})

export class PostListPage implements AfterViewInit{

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
    @ViewChildren('table') table: QueryList<MatCheckbox>
    @ViewChild(MatInput) input: MatInput;

	ngAfterViewInit() {
		setTimeout(() => {
			this.dataSource.paginator = this.paginator;
		}) 
		this.dataSource.sort = this.sort;
	}

	public displayedColumns: string[] = ['id', 'title', 'body',  'user'];
	public selection = new SelectionModel<Post>(true, []);
	public dataSource = new MatTableDataSource<Post>();
	public new: boolean = false;
	public edit: boolean = false;
	public deleted: boolean = false;
	public load: boolean = true;
	sortedData: Post[];
	posts: Post[];
    data: Post[];

	constructor(
		private _post: PostService,
		private _snackBar: MatSnackBar,
		private router: Router) {}
  
  	public ngOnInit() {
		this.getPosts();
	}

	private getPosts(){
		this._post.list().subscribe((posts:Post[]) => {
            this.data = posts;
			this.renderDataTable(posts);
            this.load = false;
		}, error => {
			this.load = false;
			return null;          
		});
	}

	  
	public renderDataTable(data: Post[]) {
		this.dataSource = new MatTableDataSource(data);	
        this.render(data);
	}

	public render(data){
        if(this.input)
            this.applyFilter(this.input.value);
		this.sortedData = data.slice();
		this.posts = data;
		setTimeout(() => {
			this.dataSource.paginator = this.paginator;
		})
		this.dataSource.sort = this.sort;
		this.load = false;
	}


	
	public delete(id){
        this.deleteByIds(id);	
	}

	public update(){
		this.router.navigateByUrl('/post/edit/'+this.selection.selected[0].id);
	}

	public openSnackBar(message: string) {
		this._snackBar.open(message,'', {
		  duration: 1500,
		});
	}

	
	public goToDetail(row){
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
			case 'title': return this.compare(a.id, b.id, isAsc);
			case 'body': return this.compare(a.id, b.id, isAsc);
			default: return 0;
		  }
		});
		this.dataSource.data = this.sortedData;
	}
	
	compare(a: number | string, b: number | string, isAsc: boolean) {
	  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
	}

	public applyFilter(event: string) {
        this.selection.clear();
	}

    private deleteByIds(ids: number[]) {
        from(ids).pipe(
          concatMap(id => this._post.delete(id))
        ).subscribe(result => {  
                this.load = true;        
            }, error => {
                this.openSnackBar(error.message);
                this.getPosts();
            },
            () => {
                this.openSnackBar('Las cámaras seleccionadas han sido archivadas correctamente');                       
                this.selection.clear();
                this.getPosts(); 
            }); 
    }
}
