import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: 'blog',
  loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule)
},
{ path: '', redirectTo: '/blog/blog-list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

  
}
