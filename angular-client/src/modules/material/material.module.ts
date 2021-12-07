import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSliderModule } from '@angular/material/slider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTreeModule } from '@angular/material/tree';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { DragDropModule} from '@angular/cdk/drag-drop';
import { MatRadioModule } from '@angular/material/radio';
import { MatBadgeModule} from '@angular/material/badge';
import { MatSortModule} from '@angular/material/sort';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

const materialModules = [
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatDialogModule,
  MatCardModule,
  MatIconModule,
  MatProgressBarModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatTableModule,
  MatCheckboxModule,
  MatGridListModule,
  MatSliderModule,
  MatPaginatorModule,
  MatSnackBarModule,
  MatSelectModule,
  MatTooltipModule,
  MatProgressSpinnerModule,
  MatChipsModule,
  MatMenuModule,
  MatSlideToggleModule,
  MatExpansionModule,
  MatTreeModule,
  MatTabsModule,
  MatDatepickerModule,
  DragDropModule,
  MatRadioModule,
  MatBadgeModule,
  MatSortModule,
  MatAutocompleteModule
];
@NgModule({
  imports: [ 
    ...materialModules
  ],
  exports: [ 
    ...materialModules
  ]
})
export class MaterialModule {}