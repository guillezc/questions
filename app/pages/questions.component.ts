import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Question } from '../classes/question';

@Component({
  selector: 'q-questions',
  templateUrl: 'app/templates/questions.component.html'
})

export class QuestionsComponent implements OnInit {

  constructor(
    private router: Router) {
  }

  ngOnInit() {

  }

}