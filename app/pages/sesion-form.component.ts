import { Component } from '@angular/core';
import { Router, ActivatedRoute, ROUTER_DIRECTIVES } from '@angular/router';
import { NgForm }    from '@angular/forms';
import { Session } from '../classes/session';
import { Logger } from '../logger';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'session-form',
  templateUrl: 'app/templates/session-form.component.html',
  directives: [ROUTER_DIRECTIVES]
})

export class SessionFormComponent{
  sessionObj: Session = new Session();
  session: FirebaseObjectObservable<any>;
  submitted = false;
  firebase: AngularFire;
  sub: any;

  constructor(
    private router         : Router,
    private route          : ActivatedRoute,
    private logger         : Logger,
    private angFire        : AngularFire) {
  		this.firebase = angFire;
  }


}