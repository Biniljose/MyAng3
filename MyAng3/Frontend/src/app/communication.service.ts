import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { Options } from 'selenium-webdriver/firefox';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class CommunicationService {

  myWebAPIUrl = 'http://localhost:8080';
  favoriteAPIUrl = this.myWebAPIUrl + '/api/favorites';
  clearText = new Subject<any>(); // for clearing search box
  invokePopup = new Subject<any>();
  errorObject = {
    status:"",
    message:""
  };
  favoriteNewsArray: Array<any> = []; // for saving favorites locally


  constructor(private http: HttpClient){
  }


  getNewsHeadlines() {
    return this.http.get(this.myWebAPIUrl + '/api/News/Headlines').map((response: any) => {
      response = JSON.parse(response);
      return response['articles'];
    })
    .catch((e: any) => Observable.throw(this.errorHandler(e, "News headlines")));
  }

  getNewsSources() {
    return this.http.get(this.myWebAPIUrl + '/api/News/Sources').map((response: any) => {
      response = JSON.parse(response);
      return response['sources'];
    })
    .catch((e: any) => Observable.throw(this.errorHandler(e, "News Sources")));
  }

  getNewsByCategory(category, pageno) {
    return this.http.get(this.myWebAPIUrl + '/api/News/' + category + '/' + pageno)
      .map((response: any) => {
        response = JSON.parse(response);
        return response;
      })
      .catch((e: any) => Observable.throw(this.errorHandler(e, "News category")));
  }

  getSearchResults(searchTxt, pageno) {
    return this.http.get(this.myWebAPIUrl + '/api/News/Search/' + searchTxt + '/' + pageno).map((response: any) => {
      response = JSON.parse(response);
      return response;
      })
      .catch((e: any) => Observable.throw(this.errorHandler(e, "Search Results")));
  }

  getAllFavorites() {
    return this.http.get(this.favoriteAPIUrl).map((response: any) => {
      return response;
    })
    .catch((e: any) => Observable.throw(this.errorHandler(e, "Favorites")));
  }

  addToFavorites(article: any) {
    return this.http.post(this.favoriteAPIUrl, {
      NewsTitle: article.title,
      NewsDescription: article.description,
      NewsImage: article.urlToImage,
      NewsPubishedTime: article.publishedAt
    }).map((response: any) => {
      return response;
    })
    .catch((e: any) => Observable.throw(this.errorHandler(e, "Adding fav")));
  }

  removeFromFavorites(article: any) {
    return this.http.delete(this.favoriteAPIUrl + '/' + article.title).map((response: any) => {
      return response;
    })
    .catch((e: any) => Observable.throw(this.errorHandler(e, "Removing fav")));
  }
  
  errorHandler(error: any, method: any) {
    console.log(error);

    this.errorObject.status = 'error';
    this.errorObject.message = 'Error while calling ' + method;
    this.invokePopup.next(this.errorObject);
    return error;   
  }

}
