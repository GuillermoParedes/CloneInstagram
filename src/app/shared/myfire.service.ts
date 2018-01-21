import * as firebase from 'firebase';

export class MyFireService {

  /**
   * @description Get user data from database firebase
   */
  getUserFromDataBase (uid) {
    const ref = firebase.database().ref('users/' + uid);

    return ref.once('value')
    .then(snapshot => snapshot.val() )
  }

}
