import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/modules/material/material.module';
import { FORM_FIELD_COMPONENTS } from './components/components';

import { HttpClient } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [FORM_FIELD_COMPONENTS],
  imports: [
    CommonModule,
    FlexModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  exports:[FORM_FIELD_COMPONENTS]
})
export class FormFieldModule {}