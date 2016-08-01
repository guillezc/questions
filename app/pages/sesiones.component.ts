import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
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

  sessions: FirebaseListObservable<any[]>;
  removes: FirebaseObjectObservable<any[]>;
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

  addSession(){
    let link = ['/sesion/nueva'];
    this.router.navigate(link);
  }

  editSession(session: any){
  	let link = ['/sesion/editar', session.$key];
    this.router.navigate(link);
  }

  deleteSession(session: any){
  	this.removes = this.firebase.database.object('/sessions/'+session.$key);
  	this.removes.remove();
  }

}