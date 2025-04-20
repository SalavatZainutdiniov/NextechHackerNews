import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/newest-stories', pathMatch: 'full' },
    {
        path: 'contact',
        loadComponent: () =>
            import('./features/hacker-contact/hacker-contact.component').then(m => m.HackerContactComponent)
    },
    {
        path: 'newest-stories',
        loadChildren: () =>
            import('./features/newest-stories/newest-stories.module').then(m => m.NewestStoriesModule),
    }
];
