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

constructor(private postService:PostService){}

  ngOnInit(){
    this.getAllPosts();
    // this.highlightLinks();
  }
  getAllPosts(){
    this.postService.getAllPosts().subscribe(comments =>{
      this.posts=comments.data;
      console.log("getting ");
      console.log(this.posts);
    });
  }

  highlightLinks(){
    for(var i=0;i<this.posts.length;i++){
      this.posts[i].text=this.posts[i].text.substr(0,this.posts[i].text.length-1-16);
    }
  }
}
