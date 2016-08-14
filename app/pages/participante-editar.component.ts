import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { Router, ActivatedRoute, ROUTER_DIRECTIVES } from '@angular/router';
import { LocalStorage, SessionStorage } from "angular2-localstorage/WebStorage";
import { NgForm } from '@angular/forms';
import { Logger } from '../logger';
import { ObjToArrPipe } from '../pipes/objToArr.pipe';
import { Session }  from '../classes/session';
import { Speaker }  from '../classes/speaker';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'q-participants-add',
  templateUrl: 'app/templates/participant-edit.component.html',
  directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES],
  pipes: [ObjToArrPipe]
})

export class ParticipantEditComponent implements OnInit{
  speakerObj: Speaker = new Speaker();
  speaker: FirebaseObjectObservable<any>;
  firebase: AngularFire; 
  sub: any;
  speakerID: any;

  constructor(
    private router         : Router,
    private route          : ActivatedRoute,
    private logger         : Logger,
    public angFire        : AngularFire,
    private titleService   : Title) {
  		this.firebase = angFire;
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  ngOnInit() {
    this.setTitle("Agregar participante - México Cumbre de Negocios");

    this.sub = this.route.params.subscribe(params => {
      this.speakerID = params['id'];
      this.speaker = this.firebase.database.object('/speakers/'+this.speakerID);
      this.speaker.subscribe(data => {
        this.speakerObj = data;
      });
    });
  }

  onSubmit(speak: any) { 

    this.speaker.update(speak);
    let link = ['/participantes'];
    this.router.navigate(link);
    
    this.redirectToParticipants();
  }

  redirectToParticipants(){
  	let link = ['/participantes'];
    this.router.navigate(link);
  }

  get diagnostic() { return JSON.stringify(this.speakerObj); }

}