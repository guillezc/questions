import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { LocalStorage, SessionStorage } from "angular2-localstorage/WebStorage";
import { Logger } from '../logger';
import { ObjToArrPipe } from '../pipes/objToArr.pipe';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'q-sessions',
  templateUrl: 'app/templates/sessions.component.html',
  directives: [ROUTER_DIRECTIVES],
  pipes: [ObjToArrPipe]
})

export class SessionsComponent implements OnInit {

  questions: FirebaseListObservable<any[]>;
  filter: FirebaseObjectObservable<any>;
  sessions: FirebaseListObservable<any[]>;
  proyecteds: FirebaseListObservable<any[]>;
  removes: FirebaseListObservable<any[]>;
  firebase: AngularFire;

  constructor(
    private router         : Router,
    private logger         : Logger,
    private angFire        : AngularFire) {
  		this.firebase = angFire;
  }

  ngOnInit() {
  	this.getSessions();
  }

  getSessions(){
    this.sessions = this.firebase.database.list('sessions');
  }

}