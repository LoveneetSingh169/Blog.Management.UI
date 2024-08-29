import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';
@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  public apiUrl = 'http://localhost:5097/api/blogpost'; // Update this URL to your API endpoint

  constructor(private http: HttpClient) { }

  getBlogPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(this.apiUrl);
  }

  getBlogPost(id: number): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${this.apiUrl}/${id}`);
  }

  addBlogPost(blogPost: BlogPost): Observable<BlogPost> {
    return this.http.post<BlogPost>(this.apiUrl, blogPost);
  }

  updateBlogPost(id: number, blogPost: BlogPost): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, blogPost);
  }

  deleteBlogPost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
