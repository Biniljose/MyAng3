import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgModule } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { arrRoutes } from '../app.module';
import { AppComponent } from '../app.component';
import { NewsbodyComponent } from '../newsbody/newsbody.component';
import { CatgeoryComponent } from '../catgeory/catgeory.component';
import { SearchComponent } from '../search/search.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommunicationService } from '../communication.service';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { FavoriteComponent } from './favorite.component';

describe('FavoriteComponent', () => {
  let component: FavoriteComponent;
  let fixture: ComponentFixture<FavoriteComponent>;

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
    fixture = TestBed.createComponent(FavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
