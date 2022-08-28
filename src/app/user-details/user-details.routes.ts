import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from './user-details.component';

const routePaths: Routes = [{ path: '', component: UserDetailsComponent }];

export const UserDetailsRoutes = RouterModule.forChild(routePaths);
