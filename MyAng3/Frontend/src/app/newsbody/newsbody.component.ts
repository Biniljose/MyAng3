import { Component, OnInit, Input } from '@angular/core';
import {CommunicationService} from '../communication.service';

@Component({
  selector: 'app-newsbody',
  templateUrl: './newsbody.component.html',
  styleUrls: ['./newsbody.component.css']
})
export class NewsbodyComponent implements OnInit {

  @Input() newsarticle: any;
  constructor(private communicationService: CommunicationService) { }
   
  ngOnInit() {
    
  }

}
