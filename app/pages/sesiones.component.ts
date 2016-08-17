import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { Logger } from '../logger';
import { ObjToArrPipe } from '../pipes/objToArr.pipe';
import { Title } from '@angular/platform-browser';
import { Session }  from '../classes/session';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, AuthProviders, AuthMethods } from 'angularfire2';

declare var SessionJS: any;
import  'app/js/sessions.js';
//import  'app/assets/pages/scripts/table-datatables-managed.js';

@Component({
  selector: 'q-sessions',
  templateUrl: 'app/templates/sessions.component.html',
  directives: [ROUTER_DIRECTIVES],
  pipes: [ObjToArrPipe]
})

export class SessionsComponent implements OnInit {

  sessions: FirebaseListObservable<any[]>;
  firebase: AngularFire;
  sessionList: Session[] = [];
  isLoaded: Boolean = false;

  constructor(
    private router         : Router,
    private logger         : Logger,
    public angFire        : AngularFire,
    private titleService   : Title) {
  		this.firebase = angFire;
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  ngOnInit() {  
  	this.getSessions();
    this.setTitle("Sesiones - México Cumbre de Negocios");
  }

  getSessions(){
    this.sessions = this.firebase.database.list('sessions');
    this.sessions.subscribe(data => {
      this.sessionList = data;
      SessionJS.init();
      this.isLoaded = true;
    });
  }

  addSession(){
    let link = ['/sesion/nueva'];
    this.router.navigate(link);
  }

  editSession(session: Session){
  	let link = ['/sesion/editar', session.$key];
    this.router.navigate(link);
  }

  deleteSession(session: Session){
  	this.firebase.database.object('/sessions/'+session.$key).remove();
  }

}