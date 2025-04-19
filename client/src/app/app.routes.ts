import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'newest-stories',
        loadChildren: () =>
            import('./newest-stories/newest-stories.module').then(m => m.NewestStoriesModule),
    }
];
