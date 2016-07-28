import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { LocalStorage, SessionStorage } from "angular2-localstorage/WebStorage";
import { Logger } from '../logger';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'q-votaciones',
  templateUrl: 'app/templates/ratings.component.html',
  directives: [ROUTER_DIRECTIVES]
})

export class RatingsComponent implements OnInit {
  sessions: FirebaseListObservable<any[]>;
  firebase: AngularFire;

  constructor(
    private router         : Router,
    private logger         : Logger,
    private angFire        : AngularFire) {
  		this.firebase = angFire;
  }

  getSessions(){
  	this.sessions = this.firebase.database.list('sessions');  
    this.logger.log(this.sessions.forEach);	
  }

  ngOnInit() {
  	this.getSessions();
  }

  goToResults() {
  	
  }

  editSession(s: any) {
  	
  }

  deleteSession(s: any) {
  	
  }

}