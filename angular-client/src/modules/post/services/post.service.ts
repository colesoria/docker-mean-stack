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

	public list(): Observable<Post[]> {
		return this.http.get(`post`, []);
	}
	public get(id: number): Observable<Post> {
		return this.http.get('post', [id]);
	}
	public create(data: any): Observable<Post> {
		return this.http.create(`post`, data);
	}
	public update(obj: Post): Observable<Post> {
		return this.http.update(`post/${obj.id}`,obj);
	}
	public delete(id: number): Observable<boolean> {
		return this.http.delete('post', [id]);
	}
}


