import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { LocalStorage, SessionStorage } from "angular2-localstorage/WebStorage";
import { Logger } from '../logger';
import { ObjToArrPipe } from '../pipes/objToArr.pipe';
import { Title } from '@angular/platform-browser';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Session }  from '../classes/session';
import { Vote }  from '../classes/vote';

declare var VoteJS: any;
import  'app/js/votes.js';

@Component({
  selector: 'q-votes',
  templateUrl: 'app/templates/votes.component.html',
  directives: [ROUTER_DIRECTIVES],
  pipes: [ObjToArrPipe]
})

export class VotesComponent implements OnInit {
  votes: FirebaseListObservable<any[]>;
  firebase: AngularFire;
  voteList: Vote[] = [];
  isLoaded: Boolean = false;

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

  getVotes(){
  	this.votes = this.firebase.database.list('votes');  
    this.votes.subscribe(data => {
      data.forEach((v: Vote) => {
        this.firebase.database.object('/sessions/'+v.sessionId).subscribe(sessionData => {
          var arr: any[] = [];
          arr[0] = sessionData;
          v.session = arr;
        });
      });
      this.voteList = data;
      VoteJS.init();
      this.isLoaded = true;
      this.logger.log(this.voteList);
    });	
  }

  ngOnInit() {
    this.setTitle("Votaciones - México Cumbre de Negocios");
  	this.getVotes();
  }

  goToResults() {
  	
  }

  addVote(){
    let link = ['/votacion/nueva'];
    this.router.navigate(link);
  }

  editVote(vote: Vote) {
  	let link = ['/votacion/editar', vote.$key];
    this.router.navigate(link);
  }

  deleteSession(s: any) {
  	
  }

}