import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { PaginationComponent } from '../_common/components/pagination/pagination.component';
import { UsernameSearchFormComponent } from '../_common/components/username-search-form/username-search-form.component';
import { RepositoryDetailsComponent } from './components/repository-details/repository-details.component';
import { RepositoryListComponent } from './components/repository-list/repository-list.component';
import { UserDetailsComponent } from './user-details.component';
import { UserDetailsRoutes } from './user-details.routes';

@NgModule({
  declarations: [UserDetailsComponent, RepositoryDetailsComponent, RepositoryListComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    UserDetailsRoutes,
    PaginationComponent,
    ReactiveFormsModule,
    UsernameSearchFormComponent
  ],
  providers: []
})
export class UserDetailsModule {}
