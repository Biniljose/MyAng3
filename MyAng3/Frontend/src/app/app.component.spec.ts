import { TestBed, async } from '@angular/core/testing';
import { NgModule } from '@angular/core';
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
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
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
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('News Web');
  }));

  it('should contain navigation bar', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.debugElement;
    expect(compiled.query(By.css('.navbar'))).toBeDefined();
  }));

  it('should contain search box', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.debugElement;
    expect(compiled.query(By.css('btn'))).toBeDefined();
  }));
  
});
