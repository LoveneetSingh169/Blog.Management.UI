import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BlogPostService } from '../../services/blog-post.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-blog-add',
  templateUrl: './blog-add.component.html'
})
export class BlogAddComponent {
  ngForm: FormGroup;
  constructor(private blogPostService: BlogPostService, private router: Router, private fb: FormBuilder) {
    this.ngForm = this.fb.group({
      id: new FormControl(0, Validators.required),
      userName: new FormControl('', Validators.required),
      text: new FormControl('', Validators.required)
    });
  }

  addBlogPost(): void {
    this.blogPostService.addBlogPost(this.ngForm.value).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
