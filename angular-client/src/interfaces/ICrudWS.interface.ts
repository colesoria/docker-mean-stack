import { Observable } from 'rxjs';

export interface ICrudWS<T>   {
    list(args?: any[]): Observable<T[]>; 
    get(id: number): Observable<T>; 
    create(obj: T): Observable<T>;
    update(obj: T): Observable<T>;
    delete(id: number): Observable<T|boolean>;
}
