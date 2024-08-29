import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogAddComponent } from './blog-add/blog-add.component';
import { BlogEditComponent } from './blog-edit/blog-edit.component';
import { BlogFormComponent } from './blog-form/blog-from.component';
import { BlogParentComponent } from './blog-parent/blog-parent.component';


const routes: Routes = [{
  path: '',
  component: BlogComponent,
  children: [
    { path: 'blog-list', component: BlogListComponent },
    { path: 'blog-add', component: BlogAddComponent },
    { path: 'blog-edit/:id', component: BlogEditComponent },
    { path: 'blog-form', component: BlogFormComponent },
    { path: 'blog-parent', component: BlogParentComponent },
  ],
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class BlogRoutingModule {
}



