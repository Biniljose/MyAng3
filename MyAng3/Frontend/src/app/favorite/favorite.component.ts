import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../communication.service';
import * as _ from '../../../node_modules/underscore-node/lib/underscore.js';


@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  arrFavNewsArticles: Array<any> = [];

  constructor(private communicationService: CommunicationService) { }

  ngOnInit() {
    this.communicationService.getAllFavorites().subscribe((x) => {
      this.arrFavNewsArticles = x;
    });
  }

  removeFromFavorites(favArticleObject) {
    let article = { title: favArticleObject.newsTitle};
    this.communicationService.removeFromFavorites(article).subscribe((data) => {
      if (this.communicationService.favoriteNewsArray.length === 1) {
        this.communicationService.favoriteNewsArray = [];
      }
      else {
        let title = article.title;
        let myArr = _.reject(this.communicationService.favoriteNewsArray, function (a) {
          return a.title === title;
        });
        this.communicationService.favoriteNewsArray = myArr;
      }

      this.communicationService.getAllFavorites().subscribe((x) => {
        this.arrFavNewsArticles = x;
      });

    });
  }

  CheckNewsInFavorites(article) {
    const search =
      _.findWhere(this.communicationService.favoriteNewsArray, { title: article.newsTitle });
    if (search !== undefined)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

}
