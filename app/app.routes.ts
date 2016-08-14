import { provideRouter, RouterConfig }  from '@angular/router';

import { HomeComponent } from './pages/inicio.component';
import { QuestionsComponent } from './pages/preguntas.component';
import { ProyectedComponent } from './pages/proyectar.component';
import { RatingsComponent } from './pages/votaciones.component';
import { SessionsComponent } from './pages/sesiones.component';
import { SessionEditComponent } from './pages/sesion-editar.component';
import { SessionAddComponent } from './pages/sesion-nueva.component';
import { ParticipantsComponent } from './pages/participantes.component';
import { ParticipantAddComponent } from './pages/participante-nuevo.component';
import { ParticipantEditComponent } from './pages/participante-editar.component';

const routes: RouterConfig = [
  {
    path: '',
    redirectTo: '/sesiones',
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
  },
  {
    path: 'sesiones',
    component: SessionsComponent
  },
  {
    path: 'sesion/editar/:id',
    component: SessionEditComponent
  },
  {
    path: 'sesion/nueva',
    component: SessionAddComponent
  },
  {
    path: 'participantes',
    component: ParticipantsComponent
  },
  {
    path: 'participante/editar/:id',
    component: ParticipantEditComponent
  },
  {
    path: 'participante/nuevo',
    component: ParticipantAddComponent
  }
];

export const appRouterProviders = [
  provideRouter(routes)
];