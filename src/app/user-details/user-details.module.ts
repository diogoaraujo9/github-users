import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { UserDetailsComponent } from './user-details.component';
import { UserDetailsRoutes } from './user-details.routes';

@NgModule({
  declarations: [UserDetailsComponent],
  imports: [CommonModule, FormsModule, UserDetailsRoutes],
  providers: []
})
export class UserDetailsModule {}
