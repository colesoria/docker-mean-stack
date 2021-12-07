import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { shareReplay, tap, catchError, map, concatMap } from 'rxjs/operators';
import { Observable, of, Subject, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})

export class HttpService {
  alert: Subject<any>  = new Subject();
  $alert = this.alert.asObservable(); 
  ws_url = 'http://localhost:3000'  

  constructor(private http: HttpClient) {}

  private url(params: any[]): string {
    let param = '';
    if (params) {
      if (params.length > 0) {
        params.forEach((item) => {
          param = param + '/' + item;
        });
      }
    }
    return param;
  }
  
  get(url: string, params: any[]): Observable<any> {
    const values = this.url(params);
    return this.http.get(this.ws_url + '/' + url + values).pipe(
      tap((item: any) => this.debugStore(item)),
      map((item) => item.data),
      catchError((err) => this.debugError(err)),
      shareReplay()
    );
  }
  update(url: string, values: any): Observable<any> {
    return this.http.put(this.ws_url + '/' + url, values).pipe(
      tap((item: any) => this.debugStore(item)),
      map((item) => item.data),
      catchError((err) => this.debugError(err)),
      shareReplay()
    );
  }
  
  create(url: string, values: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('reset', 'reset');
    return this.http
      .post(this.ws_url + '/' + url, values, { headers: headers })
      .pipe(
        tap((item: any) => this.debugStore(item)),
        map((item) => item.data),
        catchError((err) => this.debugError(err)),
        shareReplay()
      );
  }

  delete(url: string, params: any): Observable<any> {
    const values = this.url(params);
    return this.http.delete(this.ws_url + '/' + url + values).pipe(
      tap((item: any) => this.debugStore(item)),
      concatMap((item) => (item.success)? of(item.data) : throwError(item.data) ),
      catchError((err) => this.debugError(err)),
      shareReplay()
    );
  }

  private debugStore(params: any): void {
    if (params.success) {
      console.log('successful');
    } else {
      //console.log(params.data);
    }
  }

  private debugError(error: any): any {
    this.alert.next(error);
    console.log(error);
  }
}
