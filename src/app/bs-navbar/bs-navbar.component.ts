import { Component, OnInit } from '@angular/core';
// import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app.user';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  appUser: AppUser;

  // If you are using this on a HTML don't private!
  constructor(private auth: AuthService) {
    // Witha auth.user in the html you can pull all
    // the data from the observable getting data from the db
    // Very cool right?
    auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  logout(){
    this.auth.logout();
  }

  ngOnInit() {
  }

}
