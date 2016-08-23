import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { LocalStorage, SessionStorage } from "angular2-localstorage/WebStorage";
import { Logger } from '../logger';
import { ObjToArrPipe } from '../pipes/objToArr.pipe';
import { Title } from '@angular/platform-browser';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { TagInput } from 'ng2-tag-input';

import { Session }  from '../classes/session';
import { Vote }  from '../classes/vote';

@Component({
  selector: 'q-vote-add',
  templateUrl: 'app/templates/vote-add.component.html',
  directives: [ROUTER_DIRECTIVES, TagInput],
  pipes: [ObjToArrPipe]
})

export class VoteAddComponent implements OnInit {
  addObj: Vote = new Vote();
  sessions: FirebaseListObservable<any>;
  votes: FirebaseListObservable<any>;
  firebase: AngularFire;

  constructor(
    private router         : Router,
    private logger         : Logger,
    private angFire        : AngularFire,
    private titleService   : Title) {
  		this.firebase = angFire;
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  getSessions(){
  	this.sessions = this.firebase.database.list('sessions');  
  }

  ngOnInit() {
    this.setTitle("Nueva Votación - México Cumbre de Negocios");
    this.initVote();
    this.getSessions();
    this.logger.log(this.addObj);
  }

  initVote(){
    this.addObj.sessionId = "...";
    this.addObj.session = [];
    this.addObj.day = "1";
    this.addObj.question = "";
    this.addObj.responses = [];
  }

  onSubmit(sess: any){
    this.logger.log(sess);
    this.firebase.database.list('/votes').push(sess);
    this.redirectToSessions();
  }

  redirectToSessions(){
    let link = ['/votaciones'];
    this.router.navigate(link);
  }

}