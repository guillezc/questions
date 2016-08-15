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

import { NKDatetime } from 'ng2-datetime/ng2-datetime';
import { SELECT_DIRECTIVES } from 'ng2-select/ng2-select';
import { TagInput } from 'ng2-tag-input';

import  'app/assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js';
import  'app/assets/global/plugins/bootstrap-timepicker/js/bootstrap-timepicker.js';

@Component({
  selector: 'q-sessions-add',
  templateUrl: 'app/templates/session-add.component.html',
  directives: [ROUTER_DIRECTIVES, NKDatetime, SELECT_DIRECTIVES, TagInput, CORE_DIRECTIVES],
  pipes: [ObjToArrPipe]
})

export class SessionAddComponent implements OnInit {
  addObj: Session = new Session();
  session: FirebaseListObservable<any>;
  speakers: FirebaseListObservable<any>;
  speakerItems: Array<any> = [];
  moderators: FirebaseListObservable<any>;
  moderatorItems: Array<any> = [];
  orators: FirebaseListObservable<any>;
  oratorItems: Array<any> = [];

  firebase: AngularFire; 
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
     this.setTitle("Agregar sesión - México Cumbre de Negocios");

     this.initSession();
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

  initSession(){
    this.addObj.startTime = new Date();
    this.addObj.endTime = new Date();
    this.addObj.day = 1;
    this.addObj.allDay = false;
    this.addObj.hasDetails = false;
    this.addObj.onMySchedule = false;
    this.addObj.description = "";
    this.addObj.location = "";
    this.addObj.tags = [];
  }

  onSubmit(sess: any) { 

    sess.startTime = sess.startTime.getTime();
    sess.endTime = sess.endTime.getTime();

    if(sess.allDay)
      sess.endTime = sess.startTime

    this.session = this.firebase.database.list('/sessions');
    const newID = this.session.push(sess).key;
    for (var key in this.speakerItems) {
      if (this.speakerItems.hasOwnProperty(key)) {
        this.firebase.database.list('/sessions/'+newID+'/speakers').push(this.speakerItems[key]);
      }
    }
    
    this.redirectToSessions();
  }

  redirectToSessions(){
    let link = ['/sesiones'];
    this.router.navigate(link);
  }

  getSession(idSession: any){
    //this.session = this.firebase.database.object('/sessions/'+idSession);
    this.session.subscribe(data => {
      this.addObj = data;
    });
    
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
      var spkID = data['$key'];
      delete data['$key'];
      this.speakerItems[spkID] = data;
    });
  }

  removeSpeaker(value:any):void {
    delete this.speakerItems[value.id];
  }

  validaDias(value:any){
    this.isAllDays = value ? false : true;
  }

  get diagnostic() { return JSON.stringify(this.addObj); }

}