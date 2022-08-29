import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SearchUserComponent } from './search-user.component';
import { SearchUserRoutes } from './search-user.routes';

@NgModule({
  declarations: [SearchUserComponent],
  imports: [CommonModule, FontAwesomeModule, FormsModule, ReactiveFormsModule, SearchUserRoutes],
  providers: []
})
export class SearchUserModule {}
