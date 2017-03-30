import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PostsComponent} from './components/postlist.component';
const routes: Routes = [
   { path: '', redirectTo: '/posts', pathMatch: 'full' },
  { path: 'posts',  component: PostsComponent },
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
