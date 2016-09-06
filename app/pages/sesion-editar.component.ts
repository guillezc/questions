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
import { TagInputModule } from 'ng2-tag-input';

import  'app/assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js';
import  'app/assets/global/plugins/bootstrap-timepicker/js/bootstrap-timepicker.js';

@Component({
  selector: 'q-sessions-edit',
  templateUrl: 'app/templates/session-edit.component.html',
  directives: [ROUTER_DIRECTIVES, NKDatetime, SELECT_DIRECTIVES, TagInputModule, CORE_DIRECTIVES],
  pipes: [ObjToArrPipe]
})

export class SessionEditComponent implements OnInit{
  sessionObj: Session = new Session();
  session: FirebaseObjectObservable<any>;
  people: FirebaseListObservable<any>;
  peopleItems: Array<any> = [];
  managerSelect: Array<any> = [];
  oratorSelect: Array<any> = [];
  firebase: AngularFire;
  submitted = false;
  sub: any;
  sessionID: any;

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
      this.getSession();
    });
    this.getPeople();
  }

  getPeople(){
    this.people = this.firebase.database.list('people');
    this.people.subscribe(data => {
      this.peopleItems = this.setSpeakersItems(data);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSubmit(sess: any) { 
    this.submitted = false;
    sess.startTime = sess.startTime.getTime();
    sess.endTime = sess.endTime.getTime();
    this.session.update(sess);
    let link = ['/sesiones'];
    this.router.navigate(link);
  }

  getSession(){
    this.session = this.firebase.database.object('/sessions/'+this.sessionID);
    this.session.subscribe(data => {
      this.getSessionManagers();
      this.getSessionOrators();
      data.tags = data.tags ? data.tags : [];
      data.startTime = new Date(data.startTime);
      data.endTime = new Date(data.endTime);
      this.sessionObj = data;
    });
  }

  getSessionManagers(){
    this.firebase.database.list('/sessions/'+this.sessionID+'/managers').subscribe(data => {
      this.managerSelect = this.setSpeakersItems(data);
    });
  }

  getSessionOrators(){
    this.firebase.database.list('/sessions/'+this.sessionID+'/speakers').subscribe(data => {
      this.oratorSelect = this.setSpeakersItems(data);
    });
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

  addSpeaker(value:any):void {
    this.firebase.database.object('/people/'+value.id).subscribe(data => {
      var okey = data['$key'];
      delete data['$key'];
      this.firebase.database.object('sessions/'+this.sessionID+'/speakers/'+okey).update(data);
    });
    
  }

  removeSpeaker(value:any):void {
    this.firebase.database.list('sessions/'+this.sessionID+'/speakers').remove(value.id);
  }

  addManager(value:any):void {
    this.firebase.database.object('/people/'+value.id).subscribe(data => {
      var mkey = data['$key'];
      delete data['$key'];
      this.firebase.database.object('sessions/'+this.sessionID+'/managers/'+mkey).update(data);
    });
    
  }

  removeManager(value:any):void {
    this.firebase.database.list('sessions/'+this.sessionID+'/managers').remove(value.id);
  }

  get diagnostic() { return JSON.stringify(this.sessionObj); }

}