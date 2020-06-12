import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BlogPosts } from '../blog-posts';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private http: HttpClient) {}

  apiUrl: string = 'http://127.0.0.1:5000/blog/api';


public postToEdit = new BehaviorSubject<BlogPosts>(null);
  


data = { name: 'Otcollect', type: 'Website' } 
public dataSource = new BehaviorSubject(this.data); 


changeData(newData: any){
  this.dataSource.next(newData); 
  }

  getPosts() {
    return this.http.get<BlogPosts[]>(`${this.apiUrl}`);
  }




  getPost(id: string) {
    return this.http.get(this.apiUrl + '?id=' + id).subscribe((resp) => {
      this.postToEdit.next(resp);
      console.log(this.postToEdit)
    });
    
  }
 

  postPost(newPost) {
    console.log(newPost);
    return this.http.post<BlogPosts>(this.apiUrl, newPost);
  }

  deletePost(id: number) {
    const body = { id: id };
    return this.http.request('delete', this.apiUrl, { body: body });
  }
}
