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

	public list(args?:any[]): Observable<User[]> {
		return this.http.get('users', args);
	}
	public get(id: number): Observable<User> {
		return this.http.get('users', [id]);
	}

	public create(data: any): Observable<User> {
		return null;
	}
	public update(obj: User): Observable<User> {
		return null;
	}
	public delete(id: number): Observable<boolean> {
		return null;
	}
}


