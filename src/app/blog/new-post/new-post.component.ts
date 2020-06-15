import { Component, OnInit } from '@angular/core';
import { PostsComponent } from '../posts/posts.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogService } from 'src/app/services/blog.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
  providers: [PostsComponent, Location],
})
export class NewPostComponent implements OnInit {

  newPost = new FormGroup({
    title: new FormControl('',Validators.required),
    author: new FormControl('',Validators.required),
    content: new FormControl('',Validators.required),
    
  });

 
  

  constructor(private http: BlogService, private router: Router) { }

  ngOnInit(): void {
   
  }

  postPost(){
    
    this.http.postPost(this.newPost.value).subscribe(info =>{console.log(info)});
    this.router.navigateByUrl("/blog/posts");
    
    
    
  }
}
