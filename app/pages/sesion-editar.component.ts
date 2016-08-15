import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { NKDatetime } from 'ng2-datetime/ng2-datetime';
import { SELECT_DIRECTIVES } from 'ng2-select/ng2-select';
import { TagInput } from 'ng2-tag-input';

import  'app/assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js';
import  'app/assets/global/plugins/bootstrap-timepicker/js/bootstrap-timepicker.js';

@Component({
  selector: 'q-sessions-edit',
  templateUrl: 'app/templates/session-edit.component.html',
  directives: [ROUTER_DIRECTIVES, NKDatetime, SELECT_DIRECTIVES, TagInput, CORE_DIRECTIVES],
  pipes: [ObjToArrPipe]
})

export class SessionEditComponent implements OnInit{
  sessionObj: Session = new Session();
  session: FirebaseObjectObservable<any>;
  moderators: FirebaseListObservable<any>;
  moderatorItems: Array<any> = [];
  moderatorSelect: Array<any> = [];
  orators: FirebaseListObservable<any>;
  oratorItems: Array<any> = [];
  oratorSelect: Array<any> = [];
  speakerSelect: Array<any> = [];
  tagItems: Array<any> = [];
  firebase: AngularFire;
  submitted = false;
  sub: any;
  sessionID: any;
  isAllDays: Boolean = false;

  timepickerStartOpts: any = {
    minuteStep: 1
  };

  timepickerEndOpts: any = {
    minuteStep: 1
  };

  datepickerStartOpts: any = {
    autoclose: true,
    todayBtn: 'linked',
    todayHighlight: true
  };

  datepickerEndOpts: any = {
    autoclose: true,
    todayBtn: 'linked',
    todayHighlight: true
  };

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
    this.setTitle("Editar sesión - México Cumbre de Negocios");
    this.sub = this.route.params.subscribe(params => {
      this.sessionID = params['id'];
      this.getSession(this.sessionID);
    });

    this.getModerators();
    this.getOrators();
  }

  getModerators(){
    this.moderators = this.firebase.database.list('speakers', {
        query: {
          orderByChild: 'type',
          equalTo: 'Moderador'
        }
      });
     this.moderators.subscribe(data => {
      this.moderatorItems = this.setSpeakersItems(data);
    });
  }

  getOrators(){
    this.orators = this.firebase.database.list('speakers', {
        query: {
          orderByChild: 'type',
          equalTo: 'Orador'
        }
      });
     this.orators.subscribe(data => {
      this.oratorItems = this.setSpeakersItems(data);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSubmit(sess: any) { 
    this.submitted = false;
    sess.startTime = sess.startTime.getTime();
    sess.endTime = sess.endTime.getTime();
    this.logger.log(sess);
    this.session.update(sess);
    let link = ['/sesiones'];
    this.router.navigate(link);
  }

  getSession(idSession: string){
    this.session = this.firebase.database.object('/sessions/'+idSession);
    this.session.subscribe(data => {
      this.getSessionModerators(idSession);
      this.getSessionOrators(idSession);
      data.tags = data.tags ? data.tags : [];
      data.startTime = new Date(data.startTime);
      data.endTime = new Date(data.endTime);
      this.sessionObj = data;
    });
  }

  getSessionModerators(idSession: any){
    this.firebase.database.list('sessions/'+idSession+'/speakers', {
      query: {
        orderByChild: 'type',
        equalTo: 'Moderador'
      }
    }).subscribe(data => {
      this.moderatorSelect = this.setSpeakersItems(data);
    });
  }

  getSessionOrators(idSession: any){
    this.firebase.database.list('sessions/'+idSession+'/speakers', {
      query: {
        orderByChild: 'type',
        equalTo: 'Orador'
      }
    }).subscribe(data => {
      this.oratorSelect = this.setSpeakersItems(data);
    });
  }

  setSpeakerSelecteds(speakers: any[]){
    
    let items: Array<any> = [];
    for (var key in speakers) {
      if (speakers.hasOwnProperty(key)) {
        items.push({id: key, text: speakers[key].name});
      }
    }

    return items;
  }

  setSpeakersItems(speakers: Speaker[]){
    
    let items: Array<any> = [];
    speakers.forEach((spk: Speaker) => {
      items.push( {
        id  : spk.$key,
        text: spk.name
      });
    });

    return items;
  }

  addSpeaker(value:any):void {
     this.firebase.database.object('/speakers/'+value.id).subscribe(data => {
      delete data['$key'];
      this.firebase.database.list('sessions/'+this.sessionID+'/speakers').push(data);
    });
    
  }

  removeSpeaker(value:any):void {
    this.firebase.database.list('sessions/'+this.sessionID+'/speakers').remove(value.id);
  }

  validaDias(value:any){
    this.isAllDays = value ? false : true;
  }

  get diagnostic() { return JSON.stringify(this.sessionObj); }

}