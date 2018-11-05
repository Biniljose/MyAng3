import { Component, OnInit } from '@angular/core';
import { CommunicationService } from ".././communication.service"
import { debug } from 'util';
import * as _ from "../../../node_modules/underscore-node/lib/underscore.js";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  dashboardLoaded = false;
  arrNewsArticles: Array<any> = [];
  arrNewsCategory: Array<any> = [];
  arrNewsArticlesByCat: Array<any> = [];
  pageNo = 1;
  totalNewsCount = 0;
  currentCategory = "general";
  p = 1;

  constructor(private communicationService: CommunicationService) { 
  }

  ngOnInit() {

    this.communicationService.getNewsHeadlines()
      .subscribe((data) => {
        console.log("news array below");
        console.log(data);
        this.dashboardLoaded = true;
        this.arrNewsArticles = data;     
      }, (error)=>{
        console.log(error);
      });

    this.communicationService.getNewsSources().subscribe((data) => {
      let category = _.pluck(data, 'category');
      category = _.uniq(category);
      this.arrNewsCategory = category;
    });

    // Load general category news on first load.
    if (this.arrNewsCategory != null){
      this.loadCategory(this.currentCategory);
    }
  }

  /**Functions*/
  // Dropdown action: Change news based on category.
  loadCategory(category) {
    this.currentCategory = category;
    this.showNewsByCategory(category, 1);
  }

  showNewsByCategory(category, pageno) {
    if (category == null) { category = this.currentCategory; }
    this.communicationService.getNewsByCategory(category, pageno)
      .subscribe((data) => {
        console.log("cat news array below");
        console.log(data);
        this.totalNewsCount = data["totalResults"];
        this.arrNewsArticlesByCat = data["articles"];
      });
  }

  addNewsToFavorites(article) {
    this.communicationService.addToFavorites(article).subscribe((data) => {
      console.log(data);
      if (data != "" && data != undefined && data != null) {
        this.communicationService.favoriteNewsArray.push(article);
      }
    });
  }

  removeFromFavorites(article) {
    this.communicationService.removeFromFavorites(article).subscribe((data) => {
      if (this.communicationService.favoriteNewsArray.length == 1) {
        this.communicationService.favoriteNewsArray = [];
      }
      else {
        let title = article.title;
        let myArr = _.reject(this.communicationService.favoriteNewsArray, function (a) {
          console.log("article title below");
          console.log(title);
          return a.title == title;
        });
        this.communicationService.favoriteNewsArray = myArr;
      }

    });
  }

  CheckNewsInFavorites(article) {
    let search =
      _.findWhere(this.communicationService.favoriteNewsArray, { title: article.title });
    if (search != undefined)
      return true;
    else
      return false;
  }



}
