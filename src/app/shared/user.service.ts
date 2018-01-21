import { EventEmitter } from "@angular/core";



export class UserService {

  statusChange: any = new EventEmitter<any>();

  constructor () {}

  set (userDataFromDataBase) {
    localStorage.setItem('user', JSON.stringify(userDataFromDataBase));
    this.statusChange.emit(userDataFromDataBase);
  }

  getProfile () {
    const user = localStorage.getItem('user');
    return JSON.parse(user);
  }

  destroy () {
    localStorage.removeItem('user');
    this.statusChange.emit(null);
  }
}
