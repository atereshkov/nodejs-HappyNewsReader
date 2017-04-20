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
    }).then(() => console.log("Connected to indexedDb"));
  }

  addPost(summaryPost: SummaryPost) {
    db.add('posts', summaryPost,).then(() => {
    }, (error) => {
      console.log(error);
    });
  }

  getPosts(page: number, limit: number) {

    return db.createStore(1, (evt) => {
      let objectStore = evt.currentTarget.result.createObjectStore(
        'posts', {keyPath: "_id"});
    }).then(() => {
      return db.getAll('posts').then((posts) => {
        return posts.reverse().slice((page - 1) * limit, (page - 1) * limit + limit);
      }, (error) => {
        console.log(error);
      });
    });
  }
}
