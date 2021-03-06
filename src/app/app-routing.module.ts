import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog/blog.component';
import { PostsComponent } from './blog/posts/posts.component';
import { EditComponent } from './blog/edit/edit.component';
import { NewPostComponent } from './blog/new-post/new-post.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { LoginTestComponent } from './login/login-test/login-test.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { AuthGuard } from './auth/auth.guard';
import { ApiComponent } from './api/api.component';
import { ApiResultsComponent } from './api/api-results/api-results.component';
import { CloudComponent } from './cloud/cloud.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'home', component: HomeComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'blog/posts', component: PostsComponent },
  { path: 'blog/posts/new', component: NewPostComponent },
  { path: 'blog/posts/edit', component: EditComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/register', component: RegisterComponent },
  { path: 'login/test', component: LoginTestComponent , canActivate:[AuthGuard]},
  { path: 'login/forgot', component: ForgotPasswordComponent },
  { path: 'api', component: ApiComponent},
  { path: 'api/results', component: ApiResultsComponent},
  { path: 'cloud', component: CloudComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
