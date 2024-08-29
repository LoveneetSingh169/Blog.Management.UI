import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../../services/blog-post.service';
import { BlogPost } from '../../models/blog-post.model';
import { HttpErrorResponse } from '@angular/common/http';
import * as toastr from 'toastr';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html'
})
export class BlogListComponent implements OnInit {
  blogPosts: BlogPost[] = [];
  constructor(private blogPostService: BlogPostService) { }

  ngOnInit(): void {

    this.blogPostService.getBlogPosts().subscribe(data => {
      this.blogPosts = data;
    }, (err: HttpErrorResponse) => {
      toastr.error(err.message);
    });
  }

  deleteBlogPost(id: number): void {
    if (window.confirm('Are sure you want to delete this item ?')) {
      this.blogPostService.deleteBlogPost(id).subscribe(() => {
        this.blogPosts = this.blogPosts.filter(post => post.id !== id);
        toastr.success("post deleted successfully.");
      }, (err: HttpErrorResponse) => {
        toastr.error(err.message);
      });
    }
  }
}
