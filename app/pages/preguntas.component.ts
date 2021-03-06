import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { LocalStorage, SessionStorage } from "angular2-localstorage/WebStorage";
import { Logger } from '../logger';
import { Title } from '@angular/platform-browser';

import { Session }  from '../classes/session';
import { Question }  from '../classes/question';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

declare var QuestionsVar: any;
import  'app/js/questions.js';

@Component({
  selector: 'q-questions',
  templateUrl: 'app/templates/questions.component.html',
  directives: [ROUTER_DIRECTIVES]
})

export class QuestionsComponent implements OnInit {
  questions: FirebaseListObservable<any[]>;
  filter: FirebaseObjectObservable<any>;
  sessions: FirebaseListObservable<any[]>;
  proyecteds: FirebaseListObservable<any[]>;

  questionsObj: Question = new Question();
  questionsListSelected: Question[] = [];
  questionsList: Question[] = [];
  firebase: AngularFire;
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

  getQuestions(){
  	this.questions = this.firebase.database.list('questions');
    this.questions.subscribe(data => {
      data.forEach((q: Question) => {
        this.firebase.database.object('/people/'+q.userId).subscribe(speakerData => {
          q.userName = speakerData.name;
        });
        this.firebase.database.object('/sessions/'+q.sessionId).subscribe(sessionData => {
          q.sessionName = sessionData.title;
        });
      });
      this.questionsList = data;
      this.isLoaded = true;
    });
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
    this.proyecteds.subscribe(data => {
      data.forEach((q: Question) => {
        this.firebase.database.object('/people/'+q.userId).subscribe(speakerData => {
          q.userName = speakerData.name;
        });
        this.firebase.database.object('/sessions/'+q.sessionId).subscribe(sessionData => {
          q.sessionName = sessionData.title;
        });
      });
      this.questionsListSelected = data;
      QuestionsVar.init();  
    });
  }

  ngOnInit() {
    this.setTitle("Preguntas - México Cumbre de Negocios");
  	this.getQuestions();
    this.getSelecteds();
    this.getSessions();
  }

  addToSelecteds(q: Question){
    var id = q.$key;
    q.selected = true;
    delete q['$key'];
    delete q['userName'];
    delete q['sessionName'];
    this.firebase.database.object('/questions/'+id).update(q);
  }

  removeToSelecteds(q: Question){
    var id = q.$key;
    q.selected = false;
    delete q['$key'];
    delete q['userName'];
    delete q['sessionName'];
    this.firebase.database.object('/questions/'+id).update(q);
  }

  removeAll(){
    this.questionsListSelected.forEach((q: Question) => {
      var id = q.$key;
      q.selected = false;
      delete q['$key'];
      delete q['userName'];
      delete q['sessionName'];
      this.firebase.database.object('/questions/'+id).update(q);
    });
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
        data.forEach((q: Question) => {
          this.firebase.database.object('/people/'+q.userId).subscribe(speakerData => {
            q.userName = speakerData.name;
          });
          this.firebase.database.object('/sessions/'+q.sessionId).subscribe(sessionData => {
            q.sessionName = sessionData.title;
          });
        });
        this.questionsList = data;
        this.filter = this.firebase.database.object('/sessions/'+session.value);
      });
    }else{
      this.getQuestions();
    }
    
  }

}