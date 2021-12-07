import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplatePage } from 'src/pages/template/template.page';
const routes: Routes = [
  {
    path: '', component: TemplatePage, children: [
      { path: '', loadChildren: () => import('src/modules/post/post.module').then(m => m.PostModule),data: { breadcrumb: 'Post' }},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
