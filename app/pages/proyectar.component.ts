import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { LocalStorage, SessionStorage } from "angular2-localstorage/WebStorage";
import { Logger } from '../logger'

import { Question } from '../classes/question';

declare var ProyectedsVar: any;
import  'app/js/proyecteds.js';

@Component({
  selector: 'q-proyecteds',
  templateUrl: 'app/templates/proyecteds.component.html',
  directives: [ROUTER_DIRECTIVES]
})

export class ProyectedComponent implements OnInit{
  @SessionStorage() public proyecteds:Array<Question> = [];
  slides: Array<any> = [];

  constructor(
    private router         : Router,
    private logger         : Logger) {}

  ngOnInit() {
  	ProyectedsVar.init();
  	this.proyecteds[0].active = 1;
  	this.logger.log(this.proyecteds);
  }

  ngOnDestroy(){
  	ProyectedsVar.clean();
  }

}