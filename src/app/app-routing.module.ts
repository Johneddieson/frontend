import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardGuard } from './authguard.guard';
import { AddGameComponent } from './components/add-game/add-game.component';
import { EditGameComponent } from './components/edit-game/edit-game.component';
import { EditPostsComponent } from './components/edit-posts/edit-posts.component';
import { GroceriesComponent } from './components/groceries/groceries.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponent
  },
  
  {
    path: 'signup',
    component: SignupComponent
  },
  
  {
    path: 'home',
    component: HomepageComponent,
    canActivate: [AuthguardGuard]
  },

  {
    path: 'add-game',
    component: AddGameComponent,
    canActivate: [AuthguardGuard]
  },
  {
    path: 'edit-game/:id',
    component: EditGameComponent,
    canActivate: [AuthguardGuard]
  },
  {
    path: 'groceries',
    component: GroceriesComponent,
    canActivate: [AuthguardGuard]
  },
  {
    path: 'editpost/:id',
    component: EditPostsComponent,
    canActivate: [AuthguardGuard]
  }




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
