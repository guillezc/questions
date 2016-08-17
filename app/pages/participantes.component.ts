import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { Logger } from '../logger';
import { ObjToArrPipe } from '../pipes/objToArr.pipe';
import { Title } from '@angular/platform-browser';
import { Session }  from '../classes/session';
import { Speaker }  from '../classes/speaker';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, AuthProviders, AuthMethods } from 'angularfire2';

declare var ParticipantJS: any;
import  'app/js/participants.js';

@Component({
  selector: 'q-participants',
  templateUrl: 'app/templates/participants.component.html',
  directives: [ROUTER_DIRECTIVES],
  pipes: [ObjToArrPipe]
})

export class ParticipantsComponent implements OnInit {

  speakers: FirebaseListObservable<any[]>;
  firebase: AngularFire;
  speakersList: Speaker[] = [];

  constructor(
    private router         : Router,
    private logger         : Logger,
    public angFire        : AngularFire,
    private titleService   : Title) {
  		this.firebase = angFire;
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  ngOnInit() {  
  	this.getParticipants();
    this.setTitle("Participantes - México Cumbre de Negocios");
  }

  getParticipants(){
  	this.speakers = this.firebase.database.list('people');
    this.speakers.subscribe(data => {
      this.speakersList = data;
      ParticipantJS.init();
    });
  }

  addSpeaker(){
    let link = ['/participante/nuevo'];
    this.router.navigate(link);
  }

  editSpeaker(speaker: Speaker){
  	let link = ['/participante/editar', speaker.$key];
    this.router.navigate(link);
  }

  deleteSpeaker(speaker: Speaker){
  	this.firebase.database.object('/people/'+speaker.$key).remove();
  }
}