import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
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
  questions: FirebaseListObservable<Question[]>;
  qSelecteds: Question[] = [];
  firebase: AngularFire;

  constructor(
    private router         : Router,
    private questionService: QuestionService,
    private logger         :Logger,
    private angFire        : AngularFire) {
  		this.firebase = angFire;
  }
  getHeroes(){
  	//this.questionService.getQuestions().then(questions => this.onComplete(questions));
  	this.questions = this.firebase.database.list('sessions');
  	//this.questionService.getQuestions().then(function(q: any) { this.questions = q; });
  	this.logger.log(this.questions);
  }
  onComplete(qs: Question[]){
  	//this.questions = qs;
  	//this.logger.log(this.questions);
  }
  ngOnInit() {
  	this.getHeroes();
  }
  addToSelecteds(q: Question){
    this.qSelecteds.push(q);
    const itemObservable = this.firebase.database.object('/proyected');
    this.logger.log(this.qSelecteds);
    itemObservable.set(q);
  }

}