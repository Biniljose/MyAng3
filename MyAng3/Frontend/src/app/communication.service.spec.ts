import { TestBed, inject } from '@angular/core/testing';
import { NgModule } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { arrRoutes } from './app.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewsbodyComponent } from './newsbody/newsbody.component';
import { CatgeoryComponent } from './catgeory/catgeory.component';
import { SearchComponent } from './search/search.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommunicationService } from './communication.service';

describe('CommunicationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
     declarations: [AppComponent,
        DashboardComponent,
        NewsbodyComponent,
        CatgeoryComponent,
        SearchComponent,
        FavoriteComponent
      ],
      imports: [FormsModule,
        HttpClientModule,
        RouterTestingModule.withRoutes(arrRoutes),
        NgxPaginationModule
        ],
      providers: [CommunicationService]
    });
  });

  it('should be created', inject([CommunicationService], (service: CommunicationService) => {
    expect(service).toBeTruthy();
  }));

  it('should get headlines', inject([CommunicationService], (service: CommunicationService) => {
    expect(service.getNewsHeadlines()).toBeDefined();
  }));

  it('should get news by category', inject([CommunicationService], (service: CommunicationService) => {
    expect(service.getNewsByCategory("general", 1)).toBeDefined();
  }));

  it('should get categories', inject([CommunicationService], (service: CommunicationService) => {
    expect(service.getNewsSources()).toBeDefined();
  }));

});
