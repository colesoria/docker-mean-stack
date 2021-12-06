import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Post } from 'src/modules/post/models/post';
import { HttpService } from 'src/services/http.service';
import { ICrudWS } from 'src/interfaces/ICrudWS.interface';

@Injectable({
	providedIn: 'root',
})
export class PostService implements ICrudWS<Post>{
	
	constructor(private http: HttpService) {}

	public list(args?:any[]): Observable<Post[]> {
		return this.http.get(`posts`, args);
	}
	public get(id: number): Observable<Post> {
		return this.http.get('posts', [id]);
	}
	public create(data: any): Observable<Post> {
		return this.http.create(`posts`, data);
	}
	public update(obj: Post): Observable<Post> {
		return this.http.update(`posts/${obj.id}`,obj);
	}
	public delete(id: number): Observable<boolean> {
		return this.http.delete('posts', [id]);
	}
}


