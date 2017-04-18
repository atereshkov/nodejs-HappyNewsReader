import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routes.module';
import {PostsComponent} from './components/postlist.component';
import {PostService} from './services/post.service';
import {InfiniteScrollModule} from "ngx-infinite-scroll";


@NgModule({
  declarations: [
    AppComponent,
    PostsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InfiniteScrollModule,
    AppRoutingModule
  ],
  providers: [PostService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
