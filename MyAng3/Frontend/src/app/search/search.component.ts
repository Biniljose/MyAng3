import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CommunicationService } from '.././communication.service';
import { Subscription } from 'rxjs/Subscription';
import * as _ from '../../../node_modules/underscore-node/lib/underscore.js';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  pageNo = 1;
  totalCount = 0;
  searchLoaded = false;
  searchTxt: any;
  searchResultsArray: Array<any> = [];
  searchTextSubscription: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, private communicationService: CommunicationService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.searchTxt = params['txt'];
      this.searchByText(this.searchTxt, this.pageNo);
      this.communicationService.clearText.next('ok');
    });

  }

  searchByText(searchtext, pageno) {
    this.searchLoaded = false;
    this.communicationService.getSearchResults(searchtext, pageno)
      .subscribe(
        (data) => {
          this.searchLoaded = true;
          this.searchResultsArray = data["articles"];
          this.totalCount = data["totalResults"];
        }
      );
  }

  CheckNewsInFavorites(article) {
    let search =
      _.findWhere(this.communicationService.favoriteNewsArray, { title: article.title });
    if (search != undefined)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  addNewsToFavorites(article) {
    this.communicationService.addToFavorites(article).subscribe((data) => {
      console.log(data);
      if (data != '' && data != undefined && data != null) {
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
          console.log(title);
          return a.title == title;
        });
        this.communicationService.favoriteNewsArray = myArr;
      }

    });
  }


  ngOnDestroy() {
    if (this.searchTextSubscription !== undefined) {
      this.searchTextSubscription.unsubscribe();
    }
  }

}
