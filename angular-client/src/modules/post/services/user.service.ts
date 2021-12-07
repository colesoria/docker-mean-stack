import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from 'src/modules/post/models/user';
import { HttpService } from 'src/services/http.service';
import { ICrudWS } from 'src/interfaces/ICrudWS.interface';

@Injectable({
	providedIn: 'root',
})
export class UserService implements ICrudWS<User>{
	
	constructor(private http: HttpService) {}

	public list(): Observable<User[]> {
		return this.http.get('user', []);
	}
	public get(id: number): Observable<User> {
		return this.http.get('user', [id]);
	}

	public create(data: any): Observable<User> {
		return this.http.create(`user`, data);
	}
	public update(obj: User): Observable<User> {
		return this.http.update(`user/${obj.id}`,obj);
	}
	public delete(id: number): Observable<boolean> {
		return this.http.delete('user', [id]);
	}
}


