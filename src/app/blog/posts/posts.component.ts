import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';
import { Observable } from 'rxjs';
import { BlogPosts } from 'src/app/blog-posts';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  public posts;

  allPosts$: Observable<Array<BlogPosts>>;
  Post$: Observable<BlogPosts>;

  constructor(private BlogService: BlogService) {}

  ngOnInit(): void {
    this.allPosts$ = this.BlogService.getPosts();

    if (!localStorage.getItem('reload')) { 
    localStorage.setItem('reload', 'no reload') 
    this.allPosts$ = this.BlogService.getPosts();
    location.reload() 
  } 
  
  }

getPost(id: string){
  this.Post$ = this.BlogService.getPost(id);
}



deletePost(id: number){
  this.BlogService.deletePost(id).subscribe(zwrotka =>{
    console.log(zwrotka);
    this.allPosts$ = this.BlogService.getPosts();
  })
}


}
