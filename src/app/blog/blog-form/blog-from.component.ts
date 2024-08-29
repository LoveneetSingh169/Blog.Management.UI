import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogPost } from '../../models/blog-post.model';


@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.scss']
})
export class BlogFormComponent {
  @Input() blogPost: BlogPost | null = null; 
  @Output() save = new EventEmitter<BlogPost>(); 

  blogForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.blogForm = this.fb.group({
      userName: ['', Validators.required],
      text: ['', Validators.required]
    });
  }

  ngOnChanges() {
    if (this.blogPost) {
      this.blogForm.patchValue(this.blogPost); 
    }
  }

  onSubmit() {
    if (this.blogForm.valid) {
      const updatedBlogPost: BlogPost = {
        ...this.blogPost, 
        ...this.blogForm.value 
      };
      this.save.emit(updatedBlogPost);
      this.blogForm.reset();
    }
  }
}
