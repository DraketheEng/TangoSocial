import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import {NewDancerComponent} from "./pages/new-dancer/new-dancer.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {SchoolsComponent} from "./pages/schools/schools.component";
import {SchoolDetailComponent} from "./pages/school-detail/school-detail.component";
import {ForgotPasswordComponent} from "./pages/forgot-password/forgot-password.component";
import {ActivityComponent} from "./pages/activity/activity.component";
import {AboutComponent} from "./pages/about/about.component";
import {NotificationsComponent} from "./pages/notifications/notifications.component";
import {SettingsComponent} from "./pages/settings/settings.component";
import {MessagesComponent} from "./pages/messages/messages.component";
import {NewPostComponent} from "./pages/new-post/new-post.component";
import {NotFoundComponent} from "./pages/error-pages/not-found/not-found.component";
import {UnauthorizedComponent} from "./pages/error-pages/unauthorized/unauthorized.component";
import {ForbiddenComponent} from "./pages/error-pages/forbidden/forbidden.component";
import {PostDetailComponent} from "./pages/post-detail/post-detail.component";
import {BlogComponent} from "./pages/blog/blog.component";
import {HelpCenterComponent} from "./pages/help-center/help-center.component";
import {BlogDetailComponent} from "./pages/blog-detail/blog-detail.component";

const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'giris', component: LoginComponent },
  { path: 'kayit-ol', component: RegisterComponent },
  { path: 'sifremi-unuttum', component: ForgotPasswordComponent },
  { path: 'ayarlar', component: SettingsComponent },

  { path: 'yeni-dansci', component: NewDancerComponent },

  { path: 'profil/oykum-cayir', component: ProfileComponent },
  { path: 'okullar', component: SchoolsComponent },
  { path: 'okullar/capital-tango', component: SchoolDetailComponent },

  { path: 'etkinlikler', component: ActivityComponent },
  { path: 'hakkimizda', component: AboutComponent },
  { path: 'bildirimler', component: NotificationsComponent },
  { path: 'mesajlar', component: MessagesComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'blog-detay', component: BlogDetailComponent },

  { path: 'yeni-gonderi', component: NewPostComponent },
  { path: 'gonderi-detay', component: PostDetailComponent },
  { path: 'yardim', component: HelpCenterComponent },

  { path: '404', component: NotFoundComponent },
  { path: 'yetkisiz', component: UnauthorizedComponent },
  { path: 'yasakli', component: ForbiddenComponent },

  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
