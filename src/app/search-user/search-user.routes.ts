import { RouterModule, Routes } from '@angular/router';
import { SearchUserComponent } from './search-user.component';

const routePaths: Routes = [{ path: '', component: SearchUserComponent }];

export const SearchUserRoutes = RouterModule.forChild(routePaths);
