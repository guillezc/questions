import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ROUTER_DIRECTIVES } from '@angular/router';
import { LocalStorage, SessionStorage } from "angular2-localstorage/WebStorage";
import { NgForm } from '@angular/forms';
import { Logger } from '../logger';
import { ObjToArrPipe } from '../pipes/objToArr.pipe';
import { Session }  from '../classes/session';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'q-sessions-edit',
  templateUrl: 'app/templates/session-edit.component.html',
  directives: [ROUTER_DIRECTIVES],
  pipes: [ObjToArrPipe]
})

export class SessionEditComponent implements OnInit{
  sessionObj: Session = new Session();
  session: FirebaseObjectObservable<any>;
  firebase: AngularFire;
  submitted = false;
  sub: any;

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
      let id = params['id'];
      this.getSession(id);
    });
     
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSubmit(sess: Session) { 
    this.submitted = false;
    this.session.update(sess);
    let link = ['/sesiones'];
    this.router.navigate(link);
  }

  getSession(idSession: any){
    this.session = this.firebase.database.object('/sessions/'+idSession);
    this.session.subscribe(data => {
      this.sessionObj = data;
    });
    
  }

  get diagnostic() { return JSON.stringify(this.sessionObj); }

}