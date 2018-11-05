import { Component, OnInit } from '@angular/core';
import {CommunicationService} from '.././communication.service';
import { debug } from 'util';
import * as _ from '../../../node_modules/underscore-node/lib/underscore.js';

@Component({
  selector: 'app-catgeory',
  templateUrl: './catgeory.component.html',
  styleUrls: ['./catgeory.component.css']
})
export class CatgeoryComponent implements OnInit {

  arrNewsCategory: Array<any> = [];
  arrNewsArticlesByCat: Array<any> = [];
  pageNo = 1;
  totalNewsCount = 0;
  currentCategory= 'general';

  constructor(private communicationService: CommunicationService) { }
  
  
  ngOnInit() {

    this.communicationService.getNewsSources().subscribe((data)=>{
      //debugger;
      let category = _.pluck(data, 'category');
      category = _.uniq(category);
      this.arrNewsCategory = category;      
    });

    if (this.arrNewsCategory != null)
       this.loadCategory(this.currentCategory);
  }

  /**Functions*/ 
  //Dropdown action: Change news based on category.
  loadCategory(category){
    this.currentCategory = category;
    this.showNewsByCategory(category, 1);
  }

  showNewsByCategory(category, pageno){
    if(category == null)
    {category = this.currentCategory }
    this.communicationService.getNewsByCategory(category, pageno)
                                                .subscribe((data) => {
                                                  this.totalNewsCount = data["totalResults"];
                                                  this.arrNewsArticlesByCat = data["articles"];
                                                })
  }
}
