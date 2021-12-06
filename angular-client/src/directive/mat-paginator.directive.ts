import {
    Directive,
    Host,
    HostListener,
    Optional,
    Self,
  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CookieService } from 'ngx-cookie-service';
@Directive({
  selector: '[paginator]',
})

export class MatPaginatorDirective  {
  @HostListener('page', ['$event']) onChange(event: PageEvent) {
    this.setPageSize(event);
  }
  constructor(
    @Host() @Self() @Optional() private matPag: MatPaginator,
    private cookieService: CookieService
  ) {
    if(this.cookieService.get('page-size'))
      this.matPag.pageSize = Number(this.cookieService.get('page-size'));

    this.matPag.pageSizeOptions = [5, 10, 25, 100];  
  }   

  private setPageSize(event: PageEvent){     
    this.cookieService.set('page-size',String(event.pageSize));
  }  
    
}