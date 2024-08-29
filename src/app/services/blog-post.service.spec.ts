import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BlogPostService } from './blog-post.service';
import { BlogPost } from '../models/blog-post.model';

describe('BlogPostService', () => {
  let service: BlogPostService;
  let httpMock: HttpTestingController;
  const dummyPosts: BlogPost[] = [
    { id: 1, userName: 'TestUser1', dateCreated: new Date(), text: 'Sample post 1' },
    { id: 2, userName: 'TestUser2', dateCreated: new Date(), text: 'Sample post 2' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BlogPostService]
    });
    service = TestBed.inject(BlogPostService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve blog posts from the API', () => {
    service.getBlogPosts().subscribe(posts => {
      expect(posts.length).toBe(2);
      expect(posts).toEqual(dummyPosts);
    });

    const req = httpMock.expectOne(`${service.apiUrl}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyPosts);
  });

  it('should add a new blog post via POST', () => {
    const newPost: BlogPost = { id: 3, userName: 'NewUser', dateCreated: new Date(), text: 'New post' };

    service.addBlogPost(newPost).subscribe(post => {
      expect(post).toEqual(newPost);
    });

    const req = httpMock.expectOne(`${service.apiUrl}`);
    expect(req.request.method).toBe('POST');
    req.flush(newPost);
  });

  it('should delete a blog post via DELETE', () => {
    const postId = 1;

    service.deleteBlogPost(postId).subscribe(() => {});

    const req = httpMock.expectOne(`${service.apiUrl}/${postId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
