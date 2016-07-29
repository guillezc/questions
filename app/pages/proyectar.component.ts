import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { LocalStorage, SessionStorage } from "angular2-localstorage/WebStorage";
import { Logger } from '../logger'

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

declare var ProyectedsVar: any;
import  'app/js/proyecteds.js';

@Component({
  selector: 'q-proyecteds',
  templateUrl: 'app/templates/proyecteds.component.html',
  directives: [ROUTER_DIRECTIVES]
})

export class ProyectedComponent implements OnInit{
  proyecteds: FirebaseListObservable<any[]>;
  slides: Array<any> = [];
  firebase: AngularFire;

  constructor(
    private router         : Router,
    private logger         : Logger,
    private angFire        : AngularFire) {
      this.firebase = angFire;
  }

  getQuestions(){
    this.proyecteds = this.firebase.database.list('questions', {
      query: {
        orderByChild: 'selected',
        equalTo: true
      }
    });
  }

  ngOnInit() {
  	ProyectedsVar.init();
    this.getQuestions();
  }

  ngOnDestroy(){
  	ProyectedsVar.clean();
  }

}