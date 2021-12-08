import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/modules/material/material.module';

import { PostRoutingModule } from './post-routing.module';
import { COMPONENTS } from './components/components';
import { FormFieldModule } from 'src/modules/form-field/form-field.module';
import { PostListPage } from 'src/modules/post/pages/list/list.page';
import { PostFormPage } from 'src/modules/post/pages/form/form.page';
import { PostService } from './services/post.service';
import { UserService } from './services/user.service';
import { PostStore } from './stores/post.store';
import { UserStore } from './stores/user.store';

@NgModule({
  declarations: [
    COMPONENTS,
    PostListPage,
    PostFormPage
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    FormFieldModule,
    PostRoutingModule
  ],
  exports:[
    COMPONENTS
  ],
  entryComponents: [],
  providers: [PostService, UserService, PostStore, UserStore],
})
export class PostModule {}