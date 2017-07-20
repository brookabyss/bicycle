import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { BrowseComponent } from './browse/browse.component';
import { ListingsComponent } from './listings/listings.component'
const routes: Routes = [
  {
    path: '',
    pathMatch:"full",
    component: IndexComponent,
  },
  {
    path: 'browse',
    component: BrowseComponent
  },
  {
    path: 'listings',
    component: ListingsComponent 
  },
  // {
  //   path: 'users/logout',
  //   redirectTo: '/',
  // },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
