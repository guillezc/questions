import { provideRouter, RouterConfig }  from '@angular/router';

import { HomeComponent } from './pages/inicio.component';
import { QuestionsComponent } from './pages/preguntas.component';
import { ProyectedComponent } from './pages/proyectar.component';

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
  }
];

export const appRouterProviders = [
  provideRouter(routes)
];