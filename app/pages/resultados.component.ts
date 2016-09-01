import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ROUTER_DIRECTIVES } from '@angular/router';
import { LocalStorage, SessionStorage } from "angular2-localstorage/WebStorage";
import { Logger } from '../logger';
import { Title } from '@angular/platform-browser';

import { Session }  from '../classes/session';
import { Survey }  from '../classes/survey';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

declare var ResultsVar: any;
import  'app/js/results.js';

@Component({
  selector: 'q-results',
  templateUrl: 'app/templates/results.component.html',
  directives: [ROUTER_DIRECTIVES]
})

export class ResultsComponent implements OnInit {
  surveyObj: Survey = new Survey();
  sessionObj: Session = new Session();
	firebase: AngularFire;
	votes: any[] = [];
	surveyID: any;
	sub: any;
	isEmpty: boolean = false;
	isLoaded: boolean = false;
  @LocalStorage() public optionsSize: any = 'false';

	constructor(
    private router         : Router,
    private route          : ActivatedRoute,
    private logger         : Logger,
    public angFire         : AngularFire,
    private titleService   : Title) {
  		this.firebase = angFire;
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  ngOnInit() {
    this.setTitle("Resultados - México Cumbre de Negocios");
    this.route.params.subscribe(params => {
      this.surveyID = params['id'];
      this.firebase.database.object('/surveys/'+this.surveyID).subscribe(srvObj => {
        this.surveyObj = srvObj;
        this.getOptions();
        this.firebase.database.object('/sessions/'+srvObj.sessionId).subscribe(sessObj => {
          this.sessionObj = sessObj;
        });
      });
    });
    
  }

  getOptions(){
    ResultsVar.reset();

    let votesObj: any[] = [];
    let votemp: any[] = [];
    votemp.push("Opcion");
    votemp.push("Numero de votos");
    ResultsVar.setVote(votemp);

    var optionsArr = this.getArrayOf(this.surveyObj.options);
    var counter = 0;
    var load = 0;
    var dataSize = optionsArr.length;

    optionsArr.forEach((opt: any) => {
      this.firebase.database.object('/votes/'+opt.voteId).subscribe(vote => {
        let votemp: any[] = [];
        votemp.push(opt.name);
        var voteNum = (vote.users != false) ? vote.users.length : 0;
        votemp.push(voteNum);
        ResultsVar.setVote(votemp);

        load++;
        if(voteNum == 0) counter++;
        if(counter == dataSize) this.isEmpty = true;
        if(load == dataSize){
          ResultsVar.init();
          this.isLoaded = true;
        }
      });
    });
    
  }

  getArrayOf(object: any) {
    let newArr: any[] = [];
    for (var key in object) {
      object[key]["$key"] = key;
      newArr.push(object[key]);
    }
    return newArr;
  }

}