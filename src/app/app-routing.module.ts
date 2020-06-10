import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog/blog.component';
import { PostsComponent } from './blog/posts/posts.component';
import { EditComponent } from './blog/edit/edit.component';
import { NewPostComponent } from './blog/new-post/new-post.component';


const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'home', component: HomeComponent},
  {path: 'blog', component: BlogComponent },
  {path: 'blog/posts', component: PostsComponent },
  {path: 'blog/posts/new', component: NewPostComponent },
  {path: 'blog/posts/edit', component: EditComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
