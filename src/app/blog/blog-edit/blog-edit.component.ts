import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogPostService } from '../../services/blog-post.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html'
})
export class BlogEditComponent implements OnInit {
  ngForm: FormGroup;
  constructor(
    private blogPostService: BlogPostService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    const postId = Number(this.route.snapshot.paramMap.get('id'));
    this.ngForm = this.fb.group({
      id: new FormControl(postId, Validators.required),
      userName: new FormControl('', Validators.required),
      text: new FormControl('', Validators.required)
    });
    
  }
 
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.blogPostService.getBlogPost(id).subscribe(data => {      
      if (data != null ) {
        this.ngForm.patchValue({
          userName: data.userName,
          text: data.text
        });
      }
    }, (err: HttpErrorResponse) => {
      toastr.error(err.message);
    });
  }

  updateBlogPost(): void {
    if (this.ngForm.value) {
      this.blogPostService.updateBlogPost(this.ngForm.controls['id'].value, this.ngForm.value).subscribe(() => {
        this.router.navigate(['/']);
      }, (err: HttpErrorResponse) => {
        toastr.error(err.message);
      });
    }
  }
}
