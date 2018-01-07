import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { AppUser } from './models/app.user';

@Injectable()
export class AuthService {

  // Async / GetData from Fb / Whatch changes
  // The dollar sign means this is an observable
  user$: Observable<firebase.User>;

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth, private route: ActivatedRoute) {
    // This will pull the info from the server async
    // Any changes made in db will be watched by this observable
    this.user$ = afAuth.authState;
    // afAuth.authState.subscribe(user => this.user = user);
   }

  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout(){
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.user$
      .switchMap(user => {
        if (user) {
          return this.userService.get(user.uid);
        }
        return Observable.of(null);
      });
  }
}
