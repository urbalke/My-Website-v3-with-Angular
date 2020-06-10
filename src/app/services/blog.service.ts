import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BlogPosts } from '../blog-posts';


@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

apiUrl: string = 'http://127.0.0.1:5000/blog/api';


  getPosts() {
    return this.http.get<BlogPosts[]>(`${this.apiUrl}`);
  }

  getPost(id: string) {
    let params = new HttpParams();
    params.set("id", id)
   
    return this.http.get(this.apiUrl, {params: params})
  }
  

  postPost(newPost){
    console.log(newPost)
    return this.http.post(this.apiUrl, newPost);
  }

  deletePost(id: number){
    const body = {'id': id}
    return this.http.request('delete', this.apiUrl,{body: body});
  }
}
