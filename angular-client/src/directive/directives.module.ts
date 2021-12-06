import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDirective } from './drag-drop.directive';
import { FileUploadDirective } from './file-upload.directive';
import { FilterDirective } from './filter.directive';
import { MatPaginatorDirective } from './mat-paginator.directive';
import { MatSortDirective } from './mat-sort.directive';
 
@NgModule({
  declarations: [
    DragDirective,
    FileUploadDirective,
    FilterDirective,
    MatPaginatorDirective,
    MatSortDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [DragDirective,FileUploadDirective,FilterDirective,MatPaginatorDirective,MatSortDirective]

})
export class DirectivesModule { 

 


}

