import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { LocalStorage, SessionStorage } from "angular2-localstorage/WebStorage";
import { Logger } from '../logger';
import { ObjToArrPipe } from '../pipes/objToArr.pipe';
import { Title } from '@angular/platform-browser';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Session }  from '../classes/session';
import { Survey }  from '../classes/survey';

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
  surveyList: Survey[] = [];
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

  getSurveys(){
  	this.votes = this.firebase.database.list('surveys');  
    this.votes.subscribe(data => {
      data.forEach((s: Survey) => {
        this.firebase.database.object('/sessions/'+s.sessionId).subscribe(sessionData => {
          var arr: any[] = [];
          arr[0] = sessionData;
          s.session = arr;
        });
      });
      this.surveyList = data;
      VoteJS.init();
      this.isLoaded = true;
      //this.logger.log(this.surveyList);
    });	
  }

  ngOnInit() {
    this.setTitle("Votaciones - México Cumbre de Negocios");
  	this.getSurveys();
  }

  goToResults(srv: Survey) {
  	let link = ['/resultados/', srv.$key];
    this.router.navigate(link);
  }

  addSurvey(){
    let link = ['/votacion/nueva'];
    this.router.navigate(link);
  }

  editSurvey(srv: Survey) {
  	let link = ['/votacion/editar', srv.$key];
    this.router.navigate(link);
  }

  deleteSurvey(s: any) {
    this.firebase.database.list('/surveys').remove(s.$key);
    VoteJS.init();
  }

}