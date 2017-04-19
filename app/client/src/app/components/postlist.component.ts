import {Component, OnInit} from "@angular/core";

import {PostService} from "../services/post.service";
import {SummaryPost} from "../domain/summarypost";
import {IndexedDbService} from "../services/indexed-db-service";

@Component({
  selector: "posts-list",
  templateUrl: "../templates/posts.component.html",
  styleUrls: ["../styles/posts.style.css"],
})

export class PostsComponent implements OnInit {

  posts: SummaryPost[] = new Array<SummaryPost>();
  unParsedPosts: SummaryPost[] = new Array<SummaryPost>();


  limit: number = Number.parseInt(localStorage.getItem("limit"));

  page: number = Number.parseInt(localStorage.getItem("page"));

  isInCompleted: boolean = false;

  constructor(private postService: PostService,
              private indexedDbService: IndexedDbService) {
  }

  ngOnInit() {
    this.getParsedPosts();
  }


  getParsedPosts() {

    this.postService.getPosts(this.page.toString(), this.limit.toString()).subscribe(recievedPosts => {


      if (recievedPosts.data.length > 0) {

        this.unParsedPosts = recievedPosts.data;
        this.removeLinks(this.unParsedPosts);

        for (var i = 0; i < this.unParsedPosts.length; i++) {

          this.posts.push(this.unParsedPosts[i]);

          this.indexedDbService.addPost(this.unParsedPosts[i]);

        }
        this.page++;
        this.isInCompleted = false;
      }
    });
  }

  removeLinks(unparsedPosts: SummaryPost[]) {
    for (var i = 0; i < unparsedPosts.length; i++) {
      unparsedPosts[i].text = unparsedPosts[i].text.substr(0, unparsedPosts[i].text.length - 1 - 15);
    }
  }
}
