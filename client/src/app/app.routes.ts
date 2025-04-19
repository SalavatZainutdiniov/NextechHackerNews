import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/newest-stories', pathMatch: 'full' },
    {
        path: 'newest-stories',
        loadChildren: () =>
            import('./features/newest-stories/newest-stories.module').then(m => m.NewestStoriesModule),
    }
];
