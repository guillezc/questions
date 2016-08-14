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
  templateUrl: 'app/templates/participant-add.component.html',
  directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES],
  pipes: [ObjToArrPipe]
})

export class ParticipantAddComponent implements OnInit{
  speakerObj: Speaker = new Speaker();
  speakers: FirebaseListObservable<any>;
  firebase: AngularFire; 

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

    this.speakerObj.name = "";
    this.speakerObj.title = "";
    this.speakerObj.bio = "";
    this.speakerObj.type = "Moderador";
  }

  onSubmit(sess: any) { 

    this.speakers = this.firebase.database.list('speakers');
    this.speakers.push(sess);
    
    this.redirectToParticipants();
  }

  redirectToParticipants(){
  	let link = ['/participantes'];
    this.router.navigate(link);
  }

  get diagnostic() { return JSON.stringify(this.speakerObj); }

}