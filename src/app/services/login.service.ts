import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User, roleEnum } from '../models/user';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private router: Router, private auth: AngularFireAuth, private firebaseService: FirebaseService) { this.currentUser(); }

  currentUser() {
    return new Observable((observer) => {
      this.auth.onAuthStateChanged((user) => {
        observer.next(
          user ? new User(user.email, user.displayName, user.emailVerified, user.phoneNumber, user.isAnonymous) : null
        );
      });
    });
  }

  signInWithEmailAndPassword(email: string, password: string): void {
    this.auth.signInWithEmailAndPassword(email, password).then(() =>
      this.router.navigate(['/products'])
    ).catch((error) =>
      alert(error)
    );
  }

  createUserWithEmailAndPassword(email: string, password: string): void {
    this.auth.createUserWithEmailAndPassword(email, password).then(() => {
      const user = new User(email, '');
      user.role = roleEnum.Admin;
      this.firebaseService.addUser(user);
      this.router.navigate(['/products']);
    }).catch((error) =>
      alert(error)
    );
  }

  logout(){
    this.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    }, (err) => alert(err));
  }

}
