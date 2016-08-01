import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ROUTER_DIRECTIVES } from '@angular/router';
import { LocalStorage, SessionStorage } from "angular2-localstorage/WebStorage";
import { NgForm } from '@angular/forms';
import { Logger } from '../logger';
import { ObjToArrPipe } from '../pipes/objToArr.pipe';
import { Session }  from '../classes/session';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'q-sessions-add',
  templateUrl: 'app/templates/session-add.component.html',
  directives: [ROUTER_DIRECTIVES],
  pipes: [ObjToArrPipe]
})

export class SessionAddComponent implements OnInit {
  addObj: Session = new Session();
  session: FirebaseListObservable<any>;
  firebase: AngularFire;  

  constructor(
    private router         : Router,
    private route          : ActivatedRoute,
    private logger         : Logger,
    private angFire        : AngularFire,
    private titleService   : Title) {
  		this.firebase = angFire;
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  ngOnInit() {
     this.setTitle("Agregar sesión - México Cumbre de Negocios");
  }

  onSubmit(sess: Session) { 
    this.session = this.firebase.database.list('/sessions');
    this.session.push(sess);
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

  get diagnostic() { return JSON.stringify(this.addObj); }

}