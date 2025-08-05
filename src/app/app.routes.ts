import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: 'heroes',
    loadChildren: () =>
      import('./features/heroes/routes/heroes.routes').then((m) => m.HERO_ROUTES),
  },
  {
    path: '',
    redirectTo: 'heroes',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'heroes',
  },
];