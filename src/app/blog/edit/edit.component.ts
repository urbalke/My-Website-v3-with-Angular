import { Component, OnInit, Input } from '@angular/core';
import { PostsComponent } from '../posts/posts.component';
import { BlogPosts } from 'src/app/blog-posts';
import { BlogService } from 'src/app/services/blog.service';
import { Observable } from 'rxjs'; 


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [PostsComponent]
})
export class EditComponent implements OnInit {



  Post$: Observable<BlogPosts>;
  
  constructor(private BlogService: BlogService) { }

  ngOnInit(): void {
  
  }


  
    
  
}
