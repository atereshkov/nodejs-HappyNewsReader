import {Component} from "@angular/core";
import {OnInit} from "@angular/core";

import {PostService} from '../services/post.service';
import {SummaryPost} from '../domain/summarypost';

@Component({
  selector: "posts-list",
  templateUrl: "../templates/posts.component.html",
  styleUrls: ["../styles/posts.style.css"],
})

export class PostsComponent implements OnInit {

  posts: SummaryPost[] = new Array<SummaryPost>();
  unParsedPosts: SummaryPost[] = new Array<SummaryPost>();

  limit: number = Number.parseInt(localStorage.getItem("limit")) || 10;

  page: number = Number.parseInt(localStorage.getItem("page")) || 1;

  constructor(private postService: PostService) {
  }

  ngOnInit() {
    this.getParsedPosts();
  }


  getParsedPosts() {
    this.postService.getPosts(this.page.toString(), this.limit.toString()).subscribe(recievedPosts => {
      this.unParsedPosts = recievedPosts.data;
      this.removeLinks(this.unParsedPosts);
      for (var i = 0; i < this.unParsedPosts.length; i++) {
        this.posts.push(this.unParsedPosts[i]);
      }
      this.page++;
    });
  }

  removeLinks(unparsedPosts: SummaryPost[]) {
    for (var i = 0; i < unparsedPosts.length; i++) {
      unparsedPosts[i].text = unparsedPosts[i].text.substr(0, unparsedPosts[i].text.length - 1 - 15);
    }
  }
}
