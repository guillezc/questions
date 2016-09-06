import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ROUTER_DIRECTIVES } from '@angular/router';
import { LocalStorage, SessionStorage } from "angular2-localstorage/WebStorage";
import { Logger } from '../logger';
import { ObjKeyToArrPipe } from '../pipes/objKeyToArr.pipe';
import { Title } from '@angular/platform-browser';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { TagInputModule } from 'ng2-tag-input';

import { Session }  from '../classes/session';
import { Survey }  from '../classes/survey';

@Component({
  selector: 'q-vote-add',
  templateUrl: 'app/templates/vote-edit.component.html',
  directives: [ROUTER_DIRECTIVES, TagInputModule],
  pipes: [ObjKeyToArrPipe]
})

export class VoteEditComponent implements OnInit {
  surveyObj: Survey = new Survey();
  sessions: FirebaseListObservable<any>;
  votes: FirebaseListObservable<any>;
  survey: FirebaseObjectObservable<any>;
  firebase: AngularFire;
  surveyID: any;
  optionToAdd: any;
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
      this.surveyID = params['id'];
      this.getSurvey();
      this.votes = this.firebase.database.list('/votes');
    });
  }

  getSurvey(){
    this.survey = this.firebase.database.object('/surveys/'+this.surveyID);
    this.survey.subscribe(data => {
      this.firebase.database.object('/sessions/'+data.sessionId).subscribe(sessionData => {
          var arr: any[] = [];
          arr[0] = sessionData;
          data.session = arr;
        });
      this.surveyObj = data;
    });
    this.optionToAdd = {"name": "", "voteId": false};
  }

  onSubmit(srv: any){
    delete srv["optionToAdd"];
    this.firebase.database.object('/surveys/'+this.surveyID).update(srv);
    this.redirectToSessions();
  }

  addOption(){
    if(this.optionToAdd.name != ""){
      const newID = this.votes.push({"users": false}).key;
      var optemp = {"name": this.optionToAdd.name, "voteId": newID};
      this.firebase.database.list('/surveys/'+this.surveyID+"/options").push(optemp);
      this.optionToAdd.name = "";
    }
  }

  deleteOption(opt: any){
    this.firebase.database.list('/surveys/'+this.surveyID+"/options").remove(opt.$key);
  }

  editOption(name: any, key: any){
    this.firebase.database.object('/surveys/'+this.surveyID+"/options/"+key).update({"name": name});
  }

  redirectToSessions(){
    let link = ['/votaciones'];
    this.router.navigate(link);
  }

}