import {Component, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NewDancerComponent } from './pages/new-dancer/new-dancer.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SchoolsComponent } from './pages/schools/schools.component';
import { SchoolDetailComponent } from './pages/school-detail/school-detail.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivityComponent } from './pages/activity/activity.component';
import { AboutComponent } from './pages/about/about.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { NewPostComponent } from './pages/new-post/new-post.component';
import { NotFoundComponent } from './pages/error-pages/not-found/not-found.component';
import { UnauthorizedComponent } from './pages/error-pages/unauthorized/unauthorized.component';
import { ForbiddenComponent } from './pages/error-pages/forbidden/forbidden.component';
import { PostDetailComponent } from './pages/post-detail/post-detail.component';
import { HeaderComponent } from './pages/components/header/header.component';
import { FooterComponent } from './pages/components/footer/footer.component';
import { BlogComponent } from './pages/blog/blog.component';
import { HelpCenterComponent } from './pages/help-center/help-center.component';
import { BlogDetailComponent } from './pages/blog-detail/blog-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NewDancerComponent,
    ProfileComponent,
    SchoolsComponent,
    SchoolDetailComponent,
    ForgotPasswordComponent,
    ActivityComponent,
    AboutComponent,
    NotificationsComponent,
    SettingsComponent,
    MessagesComponent,
    NewPostComponent,
    NotFoundComponent,
    UnauthorizedComponent,
    ForbiddenComponent,
    PostDetailComponent,
    HeaderComponent,
    FooterComponent,
    BlogComponent,
    HelpCenterComponent,
    BlogDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
