import {Injectable} from '@angular/core';
import {AngularIndexedDB} from "angular2-indexeddb";
import {SummaryPost} from "../domain/summarypost";
let db = new AngularIndexedDB('happyNewsReader', 1);

@Injectable()
export class IndexedDbService {

  constructor() {
    this.createFields();
  }

  createFields() {
    db.createStore(1, (evt) => {
      let objectStore = evt.currentTarget.result.createObjectStore(
        'posts', {keyPath: "_id"});
    }).then();
  }


  addPost(summaryPost: SummaryPost) {
    db.add('posts', summaryPost,).then(() => {

    }, (error) => {
      console.log(error);
    });
  }

  removePost() {

  }

  updatePost() {
  }

  getPost() {

  }

  getPosts(page: number, limit: number) {
    db.getAll('posts').then((posts) => {

      console.log(posts.reverse().slice((page-2) * limit, (page-2) * limit+limit));



    }, (error) => {
      console.log("EROR");
    });
  }


}