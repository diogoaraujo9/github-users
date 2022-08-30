import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UsernameSearchFormComponent } from '../_common/components/username-search-form/username-search-form.component';

import { SearchUserComponent } from './search-user.component';
import { SearchUserRoutes } from './search-user.routes';

@NgModule({
  declarations: [SearchUserComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    SearchUserRoutes,
    UsernameSearchFormComponent
  ],
  providers: []
})
export class SearchUserModule {}
