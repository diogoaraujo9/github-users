import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SearchUserComponent } from './search-user.component';
import { SearchUserRoutes } from './search-user.routes';

@NgModule({
  declarations: [SearchUserComponent],
  imports: [CommonModule, FormsModule, SearchUserRoutes],
  providers: []
})
export class SearchUserModule {}
