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
      this.speaker = this.firebase.database.object('/people/'+this.speakerID);
      this.speaker.subscribe(data => {
        this.speakerObj = data;
      });
    });
  }

  onSubmit(speak: any) { 
    this.speaker.update(speak);
    this.updateOnSessions(speak);
  }

  updateOnSessions(speak: any){
    this.firebase.database.list('sessions').subscribe(dataSess => {
      dataSess.forEach((sess: Session) => {
        if(sess.speakers){
          for (var key in sess.speakers) {
            if (sess.speakers.hasOwnProperty(key)) {
              if(this.speakerID == key)
                this.firebase.database.object('/sessions/'+sess.$key+'/speakers/'+key).update(speak);
            }
          }
        }
        if(sess.managers){
          for (var key in sess.managers) {
            if (sess.managers.hasOwnProperty(key)) {
              if(this.speakerID == key)
                this.firebase.database.object('/sessions/'+sess.$key+'/managers/'+key).update(speak);
            }
          }
        }
      });
      this.redirectToParticipants();
    });
  }

  redirectToParticipants(){
  	let link = ['/participantes'];
    this.router.navigate(link);
  }

  get diagnostic() { return JSON.stringify(this.speakerObj); }

}