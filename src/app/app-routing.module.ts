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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'giris', component: LoginComponent },
  { path: 'kayit-ol', component: RegisterComponent },
  { path: 'yeni-dansci', component: NewDancerComponent },
  { path: 'profil/oykum-cayir', component: ProfileComponent },
  { path: 'okullar', component: SchoolsComponent },
  { path: 'okullar/capital-tango', component: SchoolDetailComponent },
  { path: 'sifremi-unuttum', component: ForgotPasswordComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
