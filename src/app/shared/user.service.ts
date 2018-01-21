

export class UserService {

  constructor () {}

  set (userDataFromDataBase) {
    localStorage.setItem('user', JSON.stringify(userDataFromDataBase));
  }

  destroy () {
    localStorage.removeItem('user');
  }
}
