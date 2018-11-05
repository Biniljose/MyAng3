import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ToastModule} from 'ng2-toastr/ng2-toastr';

/***services***/
import {CommunicationService} from './communication.service';
/***services end***/

/***components***/
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewsbodyComponent } from './newsbody/newsbody.component';
import { CatgeoryComponent } from './catgeory/catgeory.component';
import { SearchComponent } from './search/search.component';
import { FavoriteComponent } from './favorite/favorite.component';
/***components ends***/

/**Routing */
export const arrRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'newsbody', component: NewsbodyComponent },
  { path: 'category', component: CatgeoryComponent },
  { path: 'search/:txt', component: SearchComponent },
  { path: 'favorites', component: FavoriteComponent }
];
/**Routing ends */


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NewsbodyComponent,
    CatgeoryComponent,
    SearchComponent,
    FavoriteComponent
  ],
  imports: [
    BrowserModule,
    ToastModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(arrRoutes),
    FormsModule,
    NgxPaginationModule
  ],
  providers: [CommunicationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
