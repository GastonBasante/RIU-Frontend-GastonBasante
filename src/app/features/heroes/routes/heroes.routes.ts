export const HERO_ROUTES = [
  {
    path: '',
    loadComponent: () => import('../components/hero-list/hero-list.component').then(m => m.HeroListComponent)
  },
  {
    path: 'add',
    loadComponent: () => import('../components/hero-form/hero-form.component').then(m => m.HeroFormComponent)
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('../components/hero-form/hero-form.component').then(m => m.HeroFormComponent)
  }
];