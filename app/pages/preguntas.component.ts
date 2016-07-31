import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { LocalStorage, SessionStorage } from "angular2-localstorage/WebStorage";
import { Logger } from '../logger';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'q-questions',
  templateUrl: 'app/templates/questions.component.html',
  directives: [ROUTER_DIRECTIVES]
})

export class QuestionsComponent implements OnInit {
  //@SessionStorage() public proyecteds:Array<any> = [];
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

  getQuestions(){
  	this.questions = this.firebase.database.list('questions');
    this.getSelecteds();
  }

  getSessions(){
    this.sessions = this.firebase.database.list('sessions');
  }

  getSelecteds(){
    this.proyecteds = this.firebase.database.list('questions', {
      query: {
        orderByChild: 'selected',
        equalTo: true
      }
    });
  }

  ngOnInit() {
  	this.getQuestions();
    this.getSessions();
  }

  addToSelecteds(q: any){
  	this.questions.update(q.$key, { selected: true });
    this.getSelecteds();
  }

  removeToSelecteds(q: any){
    this.questions.update(q.$key, { selected: false });
    this.getSelecteds();
  }

  removeAll(){
    //this.logger.log(selectedIds.value);
    this.removes = this.firebase.database.list('questions', { preserveSnapshot: true });
    this.removes
    .subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.removes.update(snapshot.key, { selected: false });
      });
    })
    this.getQuestions();
  }

  goToProyecteds(){
    let link = ['/proyectar'];
    this.router.navigate(link);
  }

  filterQuestions(day: any, session: any){
    if(session.value != 'all'){
      this.questions = this.firebase.database.list('questions', {
        query: {
          orderByChild: 'sessionId',
          equalTo: session.value
        }
      });
    }else{
      this.questions = this.firebase.database.list('questions');
    }
    this.filter = this.firebase.database.object('/sessions/'+session.value);
  }

}