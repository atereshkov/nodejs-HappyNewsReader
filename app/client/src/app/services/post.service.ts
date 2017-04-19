import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Injectable} from '@angular/core';

import {PostsWrapper} from '../domain/postswrapper';


@Injectable()
export class PostService {
  // Resolve HTTP using the constructor
  constructor(private http: Http) {
  }

  // private instance variable to hold base url
  private postsUrl = '/api/v1/posts';

  getPosts(page: string, limit: string): Observable<PostsWrapper> {

    // ...using get
    return this.http.get(this.postsUrl + "?page=" + page + "&limit=" + limit)
    // ...and calling .json() on the response to return data
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
