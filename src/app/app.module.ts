import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input';
import { CreatePostComponent } from './components/create-post/create-post.component'
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';

import {AuthInterceptorService} from '../app/services/auth-interceptor.service'
import { AuthguardGuard } from './authguard.guard';
import {CookieService} from 'ngx-cookie-service';
import { GroceriesComponent } from './components/groceries/groceries.component'
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import { EditPostsComponent } from './components/edit-posts/edit-posts.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { GamesService } from './services/games.service';
import { AddGameComponent } from './components/add-game/add-game.component';
import {MatButtonModule} from '@angular/material/button';
import { EditGameComponent } from './components/edit-game/edit-game.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomepageComponent,
    CreatePostComponent,
    GroceriesComponent,
    EditPostsComponent,
    NavigationComponent,
    AddGameComponent,
    EditGameComponent
  ],
  imports: [
    BrowserModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule
  ],
  providers: [
    GamesService,
    AuthguardGuard,
      CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
