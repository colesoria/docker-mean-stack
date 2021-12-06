import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PostListPage } from 'src/modules/post/pages/list/list.page';
import { PostFormPage } from 'src/modules/post/pages/form/form.page';

const routes: Routes = [
  { path: '', component: PostListPage },
  { path: 'post/create', component: PostFormPage, data: { breadcrumb: 'Crear post' }},
  { path: 'post/edit/:idpost', component: PostFormPage, data: { breadcrumb: 'Editar post' }}
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PostRoutingModule { }
