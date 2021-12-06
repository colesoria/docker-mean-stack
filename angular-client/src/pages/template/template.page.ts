import { Component, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd  } from '@angular/router';
@Component({
	providers: [],
	selector: 'template-page',
  	templateUrl: './template.page.html',
  	styleUrls: ['./template.page.scss']
})

export class TemplatePage {	
	public titleBreadcrumbs: string;
    constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute) {}
	public ngOnInit(): void {}
}
