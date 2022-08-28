import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'search'
  },
  {
    path: 'search',
    loadChildren: () => import('./search-user/search-user.module').then((x) => x.SearchUserModule)
  },
  {
    path: 'user/:username',
    loadChildren: () => import('./user-details/user-details.module').then((x) => x.UserDetailsModule)
  },
  {
    path: '**',
    redirectTo: 'search',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
