import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NewestStoriesPageComponent } from './components/newest-stories-page/newest-stories-page.component';

const routes: Routes = [
  { path: '' , component: NewestStoriesPageComponent }, 
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
})
export class NewestStoriesModule { }
