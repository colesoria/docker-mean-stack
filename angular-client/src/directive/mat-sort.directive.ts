import {
    Directive,
    Host,
    HostListener,
    Optional,
    Self,
  } from '@angular/core';
import { MatSort, Sort, SortDirection } from '@angular/material/sort';
import {  Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Directive({
  selector: '[matSort]',
})
export class MatSortDirective  {

  private name: string = '';

  @HostListener('matSortChange', ['$event']) matSortChange(event: Sort) {
    this.sort(event);
  }   
    
  constructor(
    @Host() @Self() @Optional() private matSort: MatSort,
    private cookieService: CookieService,
    private router: Router
  ) {
    let urlParts = this.router.url.split('/');
    this.name = urlParts[2];
    if(this.cookieService.get(this.name+'-sort-active'))
        this.matSort.active = String(this.cookieService.get(this.name+'-sort-active'));
    
    if(this.cookieService.get(this.name+'-sort-direction')){
      let cookie = this.cookieService.get(this.name+'-sort-direction');
      let direction: SortDirection; 
      if (cookie === "")
        direction = "";
      else if(cookie === "asc")
        direction = "asc" 
      else
        direction="desc"; 
      
      this.matSort.direction = direction;
    }

    this.matSort.sortChange.emit({active : this.matSort.active, direction: this.matSort.direction });
  }

      

  private sort(event: Sort){     
    this.cookieService.set(this.name+'-sort-active', event.active);
    this.cookieService.set(this.name+'-sort-direction', event.direction);
  }   

      
}
