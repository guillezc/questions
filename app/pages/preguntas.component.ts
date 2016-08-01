import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { LocalStorage, SessionStorage } from "angular2-localstorage/WebStorage";
import { Logger } from '../logger';
import { Title } from '@angular/platform-browser';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

declare var QuestionsVar: any;
import  'app/js/questions.js';

@Component({
  selector: 'q-questions',
  templateUrl: 'app/templates/questions.component.html',
  directives: [ROUTER_DIRECTIVES]
})

export class QuestionsComponent implements OnInit {
  //@SessionStorage() public proyecteds:Array<any> = [];
  globalQuests: FirebaseObjectObservable<any[]>;
  questions: FirebaseListObservable<any[]>;
  filter: FirebaseObjectObservable<any>;
  sessions: FirebaseListObservable<any[]>;
  proyecteds: FirebaseListObservable<any[]>;
  removes: FirebaseListObservable<any[]>;
  firebase: AngularFire;

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

  getQuestions(){
  	this.questions = this.firebase.database.list('questions');
    this.getSelecteds();
  }

  getSessions(){
    this.sessions = this.firebase.database.list('sessions');
  }

  getSelecteds(){
    const queryObservable = this.proyecteds = this.firebase.database.list('questions', {
      query: {
        orderByChild: 'selected',
        equalTo: true
      }
    });
    queryObservable.subscribe(queriedItems => {
      QuestionsVar.init();  
    });
  }

  ngOnInit() {
    this.setTitle("Preguntas - México Cumbre de Negocios");
    this.globalQuests = this.firebase.database.object('/questions', { preserveSnapshot: true });
  	this.getQuestions();
    this.getSessions();
  }

  addToSelecteds(q: any){
    this.globalQuests = this.firebase.database.object('/questions/'+q.$key);
  	this.globalQuests.update({ selected: true });
    this.getSelecteds();
  }

  removeToSelecteds(q: any){
    this.globalQuests = this.firebase.database.object('/questions/'+q.$key);
    this.globalQuests.update({ selected: false });
    this.getSelecteds();
  }

  removeAll(){
    //this.logger.log(selectedIds.value);
    this.removes = this.firebase.database.list('questions', { preserveSnapshot: true });
    this.removes
    .subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.globalQuests = this.firebase.database.object('/questions/'+snapshot.key);
        this.globalQuests.update({ selected: false });
        //this.removes.update(snapshot.key, { selected: false });
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
      this.questions.subscribe(data => {
        this.filter = this.firebase.database.object('/sessions/'+session.value);
      });
    }else{
      this.questions = this.firebase.database.list('questions');
      this.questions.subscribe(data => {
        this.filter = this.firebase.database.object('/sessions/'+session.value);
      });
    }
    
  }

}