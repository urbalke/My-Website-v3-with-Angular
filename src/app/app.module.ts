import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AboutComponent } from './about/about.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { BlogComponent } from './blog/blog.component';
import { LoginComponent } from './login/login.component';
import { ApiComponent } from './api/api.component';
import { CloudComponent } from './cloud/cloud.component';
import { PostsComponent } from './blog/posts/posts.component';
import { EditComponent } from './blog/edit/edit.component';
import { NewPostComponent } from './blog/new-post/new-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlogService } from './services/blog.service';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    BlogComponent,
    LoginComponent,
    ApiComponent,
    CloudComponent,
    PostsComponent,
    EditComponent,
    NewPostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,


  ],
  providers: [BlogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
