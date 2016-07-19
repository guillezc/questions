import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

import { Question } from '../classes/question';
import { QuestionService } from '../services/question.service';


@Component({
  selector: 'q-questions',
  templateUrl: 'app/templates/questions.component.html',
  directives: [ROUTER_DIRECTIVES]
})

export class QuestionsComponent implements OnInit {
  questions: Question[];
  qSelecteds: Question[] = [];

  constructor(
    private router: Router,
    private questionService: QuestionService) {
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