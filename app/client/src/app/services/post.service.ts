import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {PostsWrapper} from '../domain/postswrapper';


@Injectable()
export class PostService {
  // Resolve HTTP using the constructor
  constructor(private http: Http) {
  }


  private postsUrl = '/api/v1/posts';

  getPosts(page: string, limit: string): Observable<PostsWrapper> {
    return this.http.get(this.postsUrl + "?page=" + page + "&limit=" + limit)
      .map((res: Response) => res.json());
  }
}
// ...errors if any
