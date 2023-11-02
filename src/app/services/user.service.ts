import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isAuthenticated: boolean = false

  constructor(private afAuth: AngularFireAuth) {}

  register({ email, password }: any) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  login({ email, password }: any) {
    this.isAuthenticated = true
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  loginWithGoogle() {
    this.isAuthenticated = true
    return this.afAuth.signInWithPopup(new GoogleAuthProvider());
  }

  logout() {
    this.isAuthenticated = false
    return this.afAuth.signOut();
  }

}
