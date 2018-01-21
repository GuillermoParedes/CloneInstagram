import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { NotificationService } from '../../shared/notification.service';
import * as firebase from 'firebase';
import { MyFireService } from '../../shared/myfire.service';
import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private notifier: NotificationService,
              private myFire: MyFireService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
  }

  onSubmit (form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(userData => {
      console.log('userDataERII')
      if (userData.emailVerified) {
        return this.myFire.getUserFromDataBase(userData.uid);
      } else {
        const message = 'you email is not yet verfied';
        this.notifier.display('error', message);
        firebase.auth().signOut();
      }
    })
    .then(userDataFromDataBase => {
      if (userDataFromDataBase) {
        console.log('userDataFromDataBase', userDataFromDataBase)
        this.userService.set(userDataFromDataBase);
        this.router.navigate(['allposts']);
      }
    })
    .catch(err => {
      this.notifier.display('error', err.message);
    });
  }
}
