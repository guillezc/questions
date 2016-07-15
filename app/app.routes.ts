import { provideRouter, RouterConfig }  from '@angular/router';

import { HomeComponent } from './pages/home.component';
import { QuestionsComponent } from './pages/questions.component';

const routes: RouterConfig = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'questions',
    component: QuestionsComponent
  }
];

export const appRouterProviders = [
  provideRouter(routes)
];