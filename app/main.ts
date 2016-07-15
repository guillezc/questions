import { bootstrap } from '@angular/platform-browser-dynamic';

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

@Component({
    selector: 'questions-app',
    templateUrl: 'app/templates/app.component.html',
    directives: [ROUTER_DIRECTIVES, HeaderComponent, SidebarComponent]
})

class MainComponent {}

bootstrap(MainComponent, [
  appRouterProviders,
  {provide: LocationStrategy, useClass: HashLocationStrategy}
]);
