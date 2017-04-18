import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router: Router) {
  }

  title = "Happy News Reader for S13.ru. Enjoy your news!";

  limit: string = "10";
  added = true;

  ngOnInit() {
    localStorage.setItem("page", "1");
  }

  addLimit() {
    localStorage.setItem('limit', this.limit);
  }

  readNews() {
    this.added = false;
    localStorage.setItem('limit', this.limit);
    this.router.navigate(['/posts']);
  }
}
