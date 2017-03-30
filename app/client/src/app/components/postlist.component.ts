import {Component} from "@angular/core";
import {OnInit} from "@angular/core";

import {PostService} from '../services/post.service';
import {SummaryPost} from '../domain/summarypost';


@Component({
  selector:"posts-list",
  templateUrl:"../templates/posts.component.html",
  styleUrls:["../styles/posts.style.css"],
})

export class PostsComponent implements OnInit{

 posts:SummaryPost[];

constructor(private postService:PostService){
}

  ngOnInit(){
    this.getAllPosts();
  }
  getAllPosts(){
    this.postService.getAllPosts().subscribe(recievedPosts =>{
      this.posts=recievedPosts.data;
      this.removeLinks();
    });
  }

  removeLinks(){
    for(var i=0;i<this.posts.length;i++){
      this.posts[i].text=this.posts[i].text.substr(0,this.posts[i].text.length-1-15);
    }
  }
}
