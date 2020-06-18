import { Component, OnInit, OnDestroy } from '@angular/core';

import { PostsComponent } from '../posts/posts.component';

import { BlogService } from 'src/app/services/blog.service';


import { BlogPosts } from 'src/app/blog-posts';
import { Form, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [PostsComponent],
})
export class EditComponent implements OnInit, OnDestroy {
  post: BlogPosts;


  constructor(private BlogService: BlogService, private router: Router) {}

  ngOnInit(): void {
    this.BlogService.postToEdit.subscribe((data) => {this.post = data});
  
    console.log(this.post);

   
  }


  ngOnDestroy(): void {
    this.BlogService.postToEdit.unsubscribe();
  }

  updatePost(editForm: NgForm) {

    console.log(editForm.value);
    this.BlogService.updatePost(editForm.value).subscribe();
    this.router.navigateByUrl("/blog/posts");

  }



 

}
