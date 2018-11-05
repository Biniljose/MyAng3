import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgModule } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { arrRoutes } from '../app.module';
import { AppComponent } from '../app.component';
import { NewsbodyComponent } from '../newsbody/newsbody.component';
import { CatgeoryComponent } from '../catgeory/catgeory.component';
import { SearchComponent } from '../search/search.component';
import { FavoriteComponent } from '../favorite/favorite.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommunicationService } from '../communication.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard.component';
import { by, element } from 'protractor';


describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let service: CommunicationService;

  beforeEach(async(() => {
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
        NgxPaginationModule],
      providers: [CommunicationService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use Communication Service to get headlines', () => {
    service = TestBed.get(CommunicationService);
    expect(service.getNewsHeadlines()).toBeDefined();
  });

});

