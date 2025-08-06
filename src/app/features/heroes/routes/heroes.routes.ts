import { UnsavedChangesGuard } from '../../../core/guards/unsaved-changes.guard';
export const HERO_ROUTES = [
  {
    path: '',
    loadComponent: () => import('../pages/heroes.component').then(m => m.HeroesComponent)
  },
  {
    path: 'add',
    loadComponent: () => import('../components/hero-form/hero-form.component').then(m => m.HeroFormComponent),
     canDeactivate: [UnsavedChangesGuard],
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('../components/hero-form/hero-form.component').then(m => m.HeroFormComponent),
     canDeactivate: [UnsavedChangesGuard],

  }
];