import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  currentUser(){}

  signInWithEmailAndPassword(email,password){}

  createUserWithEmailAndPassword(email, password){}

  signOut(){}

}
