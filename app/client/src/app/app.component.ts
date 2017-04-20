import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {IndexedDbService} from "./services/indexed-db-service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router: Router,
              private indexedDbService: IndexedDbService) {
  }


  title = "Happy News Reader for S13.ru. Enjoy your news!";


  ngOnInit() {
    localStorage.setItem("page", "1");
    localStorage.setItem("limit","5");
  }
}
