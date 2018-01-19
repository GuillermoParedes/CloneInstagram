import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedInt: boolean = false;
  constructor() { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(userData => {
      // we are logged in
      if (userData && userData.emailVerified) {
        this.isLoggedInt = true;
      } else {
        this.isLoggedInt = false;
      }
    })
  }

}
