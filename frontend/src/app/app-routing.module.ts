import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ItemsComponent } from './items/items.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ListComponent } from './list/list.component';
import { ProfileSearchComponent } from './profile-search/profile-search.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'browse', component: ItemsComponent },
  { path: 'detail/:id', component: ItemDetailComponent },
  { path: 'profile/:username', component: ProfileComponent },
  { path: 'profile/edit/:username', component: ProfileEditComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'list/:username/:listname', component: ListComponent },
  { path: 'profilesearch', component: ProfileSearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
