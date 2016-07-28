import { provideRouter, RouterConfig }  from '@angular/router';

import { HomeComponent } from './pages/inicio.component';
import { QuestionsComponent } from './pages/preguntas.component';
import { ProyectedComponent } from './pages/proyectar.component';
import { RatingsComponent } from './pages/votaciones.component';

const routes: RouterConfig = [
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    component: HomeComponent
  },
  {
    path: 'preguntas',
    component: QuestionsComponent
  },
  {
    path: 'proyectar',
    component: ProyectedComponent
  },
  {
    path: 'votaciones',
    component: RatingsComponent
  }
];

export const appRouterProviders = [
  provideRouter(routes)
];