import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Question } from '../classes/question';

@Component({
  selector: 'q-home',
  templateUrl: 'app/templates/home.component.html'
})

export class HomeComponent implements OnInit {

  constructor(
    private router: Router) {
  }

  ngOnInit() {

  }

}