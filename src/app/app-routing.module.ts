import { UserAddEditComponent } from './users/user-add-edit/user-add-edit.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UsersStartComponent } from './users/users-start/users-start.component';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const appRoutes: Routes = [
    { path: '', component: UsersStartComponent, pathMatch: 'full' },
    { path: 'user/:id', component: UserDetailComponent },
    { path: 'new', component: UserAddEditComponent },
    { path: 'user/:id/edit', component: UserAddEditComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
