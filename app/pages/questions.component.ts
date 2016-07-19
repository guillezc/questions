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
  questions: Question[];
  qSelecteds: Question[] = [];
  items: FirebaseListObservable<any[]>;

  constructor(
    private router         : Router,
    private questionService: QuestionService,
    private logger         :Logger,
    private angFire        : AngularFire) {

  		this.items = angFire.database.list('sessions');
  		this.logger.log("jhgjasgjahsgjahg");
  }
  getHeroes(){
  	this.questionService.getQuestions().then(questions => this.questions = questions);
  }
  ngOnInit() {
  	this.getHeroes();
  }
  addToSelecteds(q: Question){
    this.qSelecteds.push(q);
  }

}