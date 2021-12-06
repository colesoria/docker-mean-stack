import {
    Directive,
    Host,
    HostListener,
    Optional,
    Output,
    Self,
    EventEmitter,
  } from '@angular/core';
import { MatInput } from '@angular/material/input';
import {  Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Directive({
  selector: '[filter]',
})
export class FilterDirective  {

  private name: string = '';

  @Output() change: EventEmitter<string> = new EventEmitter(null);

  @HostListener('keyup', ['$event']) onKey(event: KeyboardEvent) {
    this.keyUp(event);
  }   


    
  constructor(
    @Host() @Self() @Optional() private matInput: MatInput,
    private cookieService: CookieService,
    private router: Router
  ) {
    let urlParts = this.router.url.split('/');
    this.name = urlParts[2];
    
    if(this.cookieService.get(this.name+'-filter')){
        this.matInput.value = String(this.cookieService.get(this.name+'-filter'));    
        this.change.emit(this.matInput.value);
    }
  }

  ngAfterViewInit(){
    this.change.emit(this.matInput.value);
  }

  private keyUp(event: KeyboardEvent){   
    const filterValue = (event.target as HTMLInputElement).value;
    this.cookieService.set(this.name+'-filter', filterValue);
    this.change.emit(filterValue);
  }    
      
}
