import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { UserService } from '../shared/user.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  constructor(private userService: UserService,
              private notifier: NotificationService) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(userData => {
      // we are logged in
      if (userData && userData.emailVerified) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    })
  }

  onLogout () {
    console.log('onlogut')
    firebase.auth().signOut()
    .then(() => {
      this.userService.destroy()
      this.isLoggedIn = false;
      this.notifier.display('success', 'Logout user');
    })
  }

}
