import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSubmit (form: NgForm) {
    const fullname = form.value.fullname;
    const email = form.value.email;
    const password = form.value.password;
    console.log("fullname", fullname);
    console.log("email", email);
    console.log("password", password);

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(userData => {
        userData.sendEmailVerification();
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
        console.log("err", err);
      })

  }

}
