import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';
import { NotificationService } from '../../shared/notification.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(private notifier: NotificationService) { }

  ngOnInit() {
  }

  onSubmit (form: NgForm) {
    const fullname = form.value.fullname;
    const email = form.value.email;
    const password = form.value.password;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(userData => {
        userData.sendEmailVerification();
        const message = `A verification email has been send  to ${email}. Kindly  check your inbox.`
        this.notifier.display('success', message);
        return firebase.database().ref('users/' + userData.uid).set({
          email: email,
          uid: userData.uid,
          registrationDate: new Date().toString(),
          name: fullname
        })
        .then(() => {
          firebase.auth().signOut();
        });
      })
      .catch(err => {
        console.log('error', err);
        this.notifier.display('error', err.message);
      })

  }

}
