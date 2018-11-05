import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommunicationService } from './communication.service';
import { Subscription } from 'rxjs/Subscription';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  searchText = '';
  clearTextSubscription: Subscription; // clear search box after search results
  popupMsgSubscription: Subscription;

  constructor(private router: Router, private communicationService: CommunicationService, public toastr: ToastsManager, vcr: ViewContainerRef) { 
    this.toastr.setRootViewContainerRef(vcr); }

  ngOnInit() {
    this.clearTextSubscription = this.communicationService.clearText.subscribe((val) => {
      if (val == "ok") {
        this.searchText = "";
      }
    });

    this.popupMsgSubscription = this.communicationService.invokePopup.subscribe((val) => {
      if (val.status == "error") {
        this.showError(val.message);
      }
    });
  }

  searchNews() {
    // debugger;
    if (this.searchText != "" && this.searchText != undefined && this.searchText != null) {
      this.router.navigate(["/search", this.searchText]);
    }
    else {
      alert('Please enter any search text');
    }

  }

  showError(message:any) {
    this.toastr.error(message, 'Oops!');
  }

  ngOnDestroy() {
    if (this.clearTextSubscription != undefined) {
      this.clearTextSubscription.unsubscribe();
    }

    if (this.popupMsgSubscription != undefined) {
      this.popupMsgSubscription.unsubscribe();
    }
  }
}
