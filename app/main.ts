import { bootstrap } from '@angular/platform-browser-dynamic';
import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';
import { Logger } from './logger';

import { Component } from '@angular/core';
import { HeaderComponent } from './header.component';
import { SidebarComponent } from './sidebar.component';

import { HomeComponent } from './pages/home.component';
import { QuestionsComponent } from './pages/questions.component';

import { appRouterProviders } from './app.routes';

import {
  Location,
  LocationStrategy,
  HashLocationStrategy
} from '@angular/common';

import {
  ROUTER_DIRECTIVES,
  RouterConfig
} from '@angular/router';

import { QuestionService } from './services/question.service';

@Component({
    selector: 'questions-app',
    templateUrl: 'app/templates/app.component.html',
    directives: [ROUTER_DIRECTIVES, HeaderComponent, SidebarComponent],
    providers: [QuestionService]
})

class MainComponent {}

bootstrap(MainComponent, [
  appRouterProviders,
  FIREBASE_PROVIDERS,
  defaultFirebase({
    apiKey: "AIzaSyB5ZUgBJabSy-F18lNUiyqmb0xy72oFCx4",
    authDomain: "questions-16537.firebaseapp.com",
    databaseURL: "https://questions-16537.firebaseio.com",
    storageBucket: "questions-16537.appspot.com"
  }),
  {provide: LocationStrategy, useClass: HashLocationStrategy},
  {provide: Logger, useClass: Logger}
]).catch(err => console.error(err));;
