import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import {LocalStorage, SessionStorage} from "angular2-localstorage/WebStorage";
import {Logger} from '../logger'

import { Question } from '../classes/question';
import { QuestionService } from '../services/question.service';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'q-questions',
  templateUrl: 'app/templates/questions.component.html',
  directives: [ROUTER_DIRECTIVES]
})

export class QuestionsComponent implements OnInit {
  @SessionStorage() public proyecteds:Array<Question> = [];
  questions: FirebaseListObservable<Question[]>;
  qSelecteds: Question[] = [];
  firebase: AngularFire;

  constructor(
    private router         : Router,
    private questionService: QuestionService,
    private logger         : Logger,
    private angFire        : AngularFire) {
  		this.firebase = angFire;
  		this.logger.log(this.proyecteds);
  }
  getHeroes(){
  	this.questions = this.firebase.database.list('sessions');  	
  }
  onComplete(qs: Question[]){
  }
  ngOnInit() {
  	this.getHeroes();
  }
  addToSelecteds(q: Question){
  	this.proyecteds.push(q);
  }

}