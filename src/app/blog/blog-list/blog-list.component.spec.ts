import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlogListComponent } from './blog-list.component';
import { BlogPostService } from '../../services/blog-post.service';
import { of } from 'rxjs';
import { BlogPost } from '../../models/blog-post.model';

describe('BlogListComponent', () => {
  let component: BlogListComponent;
  let fixture: ComponentFixture<BlogListComponent>;
  let blogPostService: jasmine.SpyObj<BlogPostService>;

  const dummyPosts: BlogPost[] = [
    { id: 1, userName: 'TestUser1', dateCreated: new Date(), text: 'Sample post 1' },
    { id: 2, userName: 'TestUser2', dateCreated: new Date(), text: 'Sample post 2' }
  ];

  beforeEach(() => {
    const spy = jasmine.createSpyObj('BlogPostService', ['getBlogPosts', 'deleteBlogPost']);

    TestBed.configureTestingModule({
      declarations: [BlogListComponent],
      providers: [{ provide: BlogPostService, useValue: spy }]
    }).compileComponents();

    blogPostService = TestBed.inject(BlogPostService) as jasmine.SpyObj<BlogPostService>;
    fixture = TestBed.createComponent(BlogListComponent);
    component = fixture.componentInstance;

    blogPostService.getBlogPosts.and.returnValue(of(dummyPosts));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load blog posts on init', () => {
    expect(component.blogPosts.length).toBe(2);
    expect(component.blogPosts).toEqual(dummyPosts);
  });
});
