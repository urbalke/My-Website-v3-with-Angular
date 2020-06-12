import { Component, OnInit, Input } from '@angular/core';
import { PostsComponent } from '../posts/posts.component';
import { BlogPosts } from 'src/app/blog-posts';
import { BlogService } from 'src/app/services/blog.service';
import { Observable, BehaviorSubject, Subscription } from 'rxjs'; 
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [PostsComponent]
})
export class EditComponent implements OnInit {

 post: any;

  constructor(private BlogService: BlogService) { }

  ngOnInit(): void {
 
    this.BlogService.postToEdit.subscribe(data => this.post = data); 

}



}