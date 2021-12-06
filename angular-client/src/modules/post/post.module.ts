import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from 'src/directive/directives.module';
import { FlexModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/modules/material/material.module';

import { PostRoutingModule } from './post-routing.module';
import { COMPONENTS } from './components/components';
import { FormFieldModule } from 'src/modules/form-field/form-field.module';
import { PostListPage } from 'src/modules/post/pages/list/list.page';
import { PostFormPage } from 'src/modules/post/pages/form/form.page';
import { HttpClient } from '@angular/common/http';
import { HttpService } from 'src/services/http.service';

@NgModule({
  declarations: [
    COMPONENTS,
    PostListPage,
    PostFormPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexModule,
    FormFieldModule,
    PostRoutingModule,
    DirectivesModule
  ],
  exports:[
    COMPONENTS
  ],
  entryComponents: [],
  providers: [HttpService],
})
export class PostModule {}