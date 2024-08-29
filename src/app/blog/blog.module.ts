import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlogComponent } from './blog.component';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogAddComponent } from './blog-add/blog-add.component';
import { BlogEditComponent } from './blog-edit/blog-edit.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogFormComponent } from './blog-form/blog-from.component';
import { BlogParentComponent } from './blog-parent/blog-parent.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BlogRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    BlogComponent,
    BlogAddComponent,
    BlogEditComponent,
    BlogListComponent,
    BlogFormComponent,
    BlogParentComponent
  ],
})
export class BlogModule { }
