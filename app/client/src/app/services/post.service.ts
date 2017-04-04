
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Injectable } from '@angular/core';

import {PostsWrapper} from '../domain/postswrapper';



@Injectable()
export class PostService {
     // Resolve HTTP using the constructor
     constructor (private http: Http) {}
     // private instance variable to hold base url
     private commentsUrl = '/api/v1/posts';

     getAllPosts() : Observable<PostsWrapper> {

             // ...using get request
             return this.http.get(this.commentsUrl)
                            // ...and calling .json() on the response to return data
                             .map((res:Response) => res.json())
                             //...errors if any
                             .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
         }
}
