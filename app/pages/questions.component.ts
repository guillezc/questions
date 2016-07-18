import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Question } from '../classes/question';
import { QuestionService } from '../services/question.service';


@Component({
  selector: 'q-questions',
  templateUrl: 'app/templates/questions.component.html'
})

export class QuestionsComponent implements OnInit {
  questions: Question[];

  constructor(
    private router: Router,
    private questionService: QuestionService) {
  }
  getHeroes(){
  	this.questionService.getQuestions().then(questions => this.questions = questions);
  }
  ngOnInit() {
  	this.getHeroes();;
  }

}