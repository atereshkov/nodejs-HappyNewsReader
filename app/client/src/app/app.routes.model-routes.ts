mport { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: '', redirectTo: '/posts', pathMatch: 'full' },
  { path: 'posts',  component: PostsComponent }
];
@NgModule({
  exports: [ RouterModule ]
  imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule {}
