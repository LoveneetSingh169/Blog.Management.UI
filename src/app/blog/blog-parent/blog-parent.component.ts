import { Component } from '@angular/core';
import { BlogPost } from '../../models/blog-post.model';
import { BlogPostService } from '../../services/blog-post.service';
import { HttpErrorResponse } from '@angular/common/http';
import * as toastr from 'toastr';

@Component({
    selector: 'app-blog-parent',
    templateUrl: './blog-parent.component.html',
    styleUrls: ['./blog-parent.component.scss']
})
export class BlogParentComponent {
    selectedBlogPost: BlogPost | null = null;
    blogPosts: BlogPost[] = [];
    constructor(private blogPostService: BlogPostService) { }
    ngOnInit(): void {

        this.blogPostService.getBlogPosts().subscribe(data => {
            this.blogPosts = data;
        }, (err: HttpErrorResponse) => {
            toastr.error(err.message);
        });
    }
    onEdit(blogPost: BlogPost) {
        this.selectedBlogPost = blogPost;
    }

    onSave(blogPost: BlogPost) {
        if (this.selectedBlogPost) {
            this.blogPostService.updateBlogPost(blogPost.id, blogPost).subscribe(() => {
                this.selectedBlogPost = null;
                this.loadBlogPosts();
                toastr.success("post updated successfully.");
            });
        } else {
            this.blogPostService.addBlogPost(blogPost).subscribe(() => {
                this.loadBlogPosts();
                toastr.success("post added successfully.");
            });
        }
    }

    loadBlogPosts() {
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
            }, (err: HttpErrorResponse) => {
                toastr.error(err.message);
            });
        }
    }
}
