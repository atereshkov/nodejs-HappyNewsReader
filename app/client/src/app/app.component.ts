import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = "Happy News Reader for S13.ru. Enjoy your news!";

  ngOnInit() {
    localStorage.setItem("page", "1");
    localStorage.setItem("limit", "10");
  }
}
