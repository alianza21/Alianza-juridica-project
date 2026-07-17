import { Routes } from '@angular/router';
import { ConsultaComponent } from './pages/form/form.component';

export const routes: Routes = [
  { path: '',
    loadComponent: () => import('./pages/landing/landing.component').then(m => m.LandingComponent),
    pathMatch: 'full',
    title: 'Soto Argel & Asociados | Inicio'
  },
  {
    path: 'consulta',
    component: ConsultaComponent,
    title: 'Soto Argel & Asociados | Consulta'
  },
  {
    path: 'data-authorization',
    loadComponent: () => import('./pages/data-authorization/data-authorization.component').then(m => m.DataAuthorizationComponent),
    title: 'Soto Argel & Asociados | Autorización de Datos'
  },
  {
    path: 'privacy-policy',
    loadComponent: () => import('./pages/privacy-policy/privacy-policy.component').then(m => m.PrivacyPolicyComponent),
    title: 'Soto Argel & Asociados | Política de Privacidad'
  },
  {path: '**', redirectTo: 'landing'}
];
