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
  startLength = 0;

  isInCompleted: boolean = false;

  constructor(private postService: PostService,
              private indexedDbService: IndexedDbService) {
  }

  ngOnInit() {
    this.getParsedPosts();
  }


  getParsedPosts() {

    this.postService.getPosts(this.page.toString(), this.limit.toString()).subscribe(
      (recievedPosts) => {

        if (recievedPosts.data.length > 0) {

          this.unParsedPosts = recievedPosts.data;
          this.removeLinks(this.unParsedPosts);

          for (var i = 0; i < this.unParsedPosts.length; i++) {
            if (!this.posts.includes(this.unParsedPosts[i])) {
              this.posts.push(this.unParsedPosts[i]);
            }
            this.indexedDbService.addPost(this.unParsedPosts[i]);

          }
          this.page++;

          this.isInCompleted = false;
        }
      },
      (error) => {
        if (error.status == 0 || error.status == 500) {

          this.indexedDbService.getPosts(this.page, this.limit).then((value) => {
              this.unParsedPosts = value;
              console.log(this.unParsedPosts);
            }
          ).then(() => {
            if (this.posts.length == 0 && this.unParsedPosts.length != 0) {
              this.posts.push(this.unParsedPosts[0]);
            }
            for (var j = 0; j < this.unParsedPosts.length; j++) {
              if (!this.posts.includes(this.unParsedPosts[j])) {
                this.posts.push(this.unParsedPosts[j]);
              }
            }
          });
          this.isInCompleted = false;
          this.page++;
        }
      }
    );
  }

  removeLinks(unparsedPosts: SummaryPost[]) {
    for (var i = 0; i < unparsedPosts.length; i++) {
      unparsedPosts[i].text = unparsedPosts[i].text.substr(0, unparsedPosts[i].text.length - 1 - 15);
    }
  }
}
