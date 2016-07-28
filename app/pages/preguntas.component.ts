import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { LocalStorage, SessionStorage } from "angular2-localstorage/WebStorage";
import { Logger } from '../logger'

import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'q-questions',
  templateUrl: 'app/templates/questions.component.html',
  directives: [ROUTER_DIRECTIVES]
})

export class QuestionsComponent implements OnInit {
  @SessionStorage() public proyecteds:Array<any> = [];
  questions: FirebaseListObservable<any[]>;
  qSelecteds: any[] = [];
  firebase: AngularFire;

  constructor(
    private router         : Router,
    private logger         : Logger,
    private angFire        : AngularFire) {
  		this.firebase = angFire;
  		//this.logger.log(this.proyecteds);
  }
  getQuestions(){
  	this.questions = this.firebase.database.list('questions');  
    //this.logger.log(this.questions.forEach);	
  }
  onComplete(qs: any[]){
  }
  ngOnInit() {
  	this.getQuestions();
  }
  addToSelecteds(q: any){
  	this.proyecteds.push(q);
  }
  goToProyecteds(){
    let link = ['/proyectar'];
    this.router.navigate(link);
  }

}