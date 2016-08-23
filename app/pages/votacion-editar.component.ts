import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ROUTER_DIRECTIVES } from '@angular/router';
import { LocalStorage, SessionStorage } from "angular2-localstorage/WebStorage";
import { Logger } from '../logger';
import { ObjToArrPipe } from '../pipes/objToArr.pipe';
import { Title } from '@angular/platform-browser';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { TagInput } from 'ng2-tag-input';

import { Session }  from '../classes/session';
import { Vote }  from '../classes/vote';

@Component({
  selector: 'q-vote-add',
  templateUrl: 'app/templates/vote-edit.component.html',
  directives: [ROUTER_DIRECTIVES, TagInput],
  pipes: [ObjToArrPipe]
})

export class VoteEditComponent implements OnInit {
  voteObj: Vote = new Vote();
  sessions: FirebaseListObservable<any>;
  vote: FirebaseObjectObservable<any>;
  firebase: AngularFire;
  voteID: any;
  sub: any;

  constructor(
    private router         : Router,
    private route          : ActivatedRoute,
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
    this.getSessions();
    this.sub = this.route.params.subscribe(params => {
      this.voteID = params['id'];
      this.getVote();
    });
  }

  getVote(){
    this.vote = this.firebase.database.object('/votes/'+this.voteID);
    this.vote.subscribe(data => {
      this.firebase.database.object('/sessions/'+data.sessionId).subscribe(sessionData => {
          var arr: any[] = [];
          arr[0] = sessionData;
          data.session = arr;
        });
      this.voteObj = data;
    });
  }

  onSubmit(vote: any){
    this.firebase.database.object('/votes/'+this.voteID).update(vote);
    this.redirectToSessions();
  }

  redirectToSessions(){
    let link = ['/votaciones'];
    this.router.navigate(link);
  }

}