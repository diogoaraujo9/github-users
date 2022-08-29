import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { PaginationComponent } from '../_common/components/pagination/pagination.component';
import { RepositoryListComponent } from './components/repository-list/repository-list.component';
import { UserDetailsComponent } from './user-details.component';
import { UserDetailsRoutes } from './user-details.routes';

@NgModule({
  declarations: [UserDetailsComponent, RepositoryListComponent],
  imports: [CommonModule, FontAwesomeModule, FormsModule, UserDetailsRoutes, PaginationComponent],
  providers: []
})
export class UserDetailsModule {}
