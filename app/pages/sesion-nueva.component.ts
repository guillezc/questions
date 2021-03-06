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
import { TagInputModule } from 'ng2-tag-input';

import  'app/assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js';
import  'app/assets/global/plugins/bootstrap-timepicker/js/bootstrap-timepicker.js';

@Component({
  selector: 'q-sessions-add',
  templateUrl: 'app/templates/session-add.component.html',
  directives: [ROUTER_DIRECTIVES, NKDatetime, SELECT_DIRECTIVES, TagInputModule, CORE_DIRECTIVES],
  pipes: [ObjToArrPipe]
})

export class SessionAddComponent implements OnInit {
  addObj: Session = new Session();
  session: FirebaseListObservable<any>;
  people: FirebaseListObservable<any>;
  peopleItems: Array<any> = [];
  managerSelect: Array<any> = [];
  oratorSelect: Array<any> = [];

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
     this.getPeople();
  }

  getPeople(){
    this.people = this.firebase.database.list('people');
    this.people.subscribe(data => {
      this.peopleItems = this.setSpeakersItems(data);
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
    for (var key in this.oratorSelect) {
      if (this.oratorSelect.hasOwnProperty(key)) {
        this.firebase.database.object('/sessions/'+newID+'/speakers/'+key).update(this.oratorSelect[key]);
      }
    }
    for (var mkey in this.managerSelect) {
      if (this.managerSelect.hasOwnProperty(mkey)) {
        this.firebase.database.object('/sessions/'+newID+'/managers/'+mkey).update(this.managerSelect[mkey]);
      }
    }
    
    this.redirectToSessions();
  }

  redirectToSessions(){
    let link = ['/sesiones'];
    this.router.navigate(link);
  }

  getSession(idSession: any){
    this.session.subscribe(data => {
      this.addObj = data;
    });
    
  }

  addSpeaker(value:any):void {
    this.firebase.database.object('/people/'+value.id).subscribe(data => {
      var spkID = data['$key'];
      delete data['$key'];
      this.oratorSelect[spkID] = data;
    });
  }

  removeSpeaker(value:any):void {
    delete this.oratorSelect[value.id];
  }

  addManager(value:any):void {
    this.firebase.database.object('/people/'+value.id).subscribe(data => {
      var spkID = data['$key'];
      delete data['$key'];
      this.managerSelect[spkID] = data;
    });
  }

  removeManager(value:any):void {
    delete this.managerSelect[value.id];
  }

  setSpeakersItems(speakers: Speaker[]){

    let items: Array<any> = [];
    if(speakers.length>0){
      speakers.forEach((spk: Speaker) => {
        items.push( {
          id  : spk.$key,
          text: spk.name
        });
      });
    }

    return items;
  }

  get diagnostic() { return JSON.stringify(this.addObj); }

}