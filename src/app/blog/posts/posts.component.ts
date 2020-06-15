import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';
import { Observable } from 'rxjs';
import { BlogPosts } from 'src/app/blog-posts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit, OnChanges {
  public posts;



  allPosts$: Observable<Array<BlogPosts>>;


  constructor(private BlogService: BlogService,
    public router: Router) {}

  ngOnInit(): void {
    this.allPosts$ = this.BlogService.getPosts();
  
  }

  ngOnChanges(): void {
    this.allPosts$ = this.BlogService.getPosts();
  }


getPost(id: string){
  console.log("sending id:" +id);
  this.BlogService.getPost(id);
  this.router.navigateByUrl("/blog/posts/edit");

}



deletePost(id: number){
  this.BlogService.deletePost(id).subscribe(zwrotka =>{
    console.log(zwrotka);
    this.allPosts$ = this.BlogService.getPosts();
  })
}



}






//   if (!localStorage.getItem('reload')) { 
  // localStorage.setItem('reload', 'no reload') 
  // this.allPosts$ = this.BlogService.getPosts();
  // location.reload()
  // } else {
  //   localStorage.removeItem('reload')
  // }