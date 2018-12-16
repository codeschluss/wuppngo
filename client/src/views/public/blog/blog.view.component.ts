import { Component } from '@angular/core';
import { BlogModel } from 'src/realm/blog/blog.model';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
    selector: 'blog-view',
    styleUrls: ['blog.component.css'],
    templateUrl: 'blog.view.component.html'
})

export class BlogViewComponent {

  public static readonly imports = [];
  public blog: Observable<BlogModel>;

  constructor(
    route: ActivatedRoute
  ) {
    this.blog = route.snapshot.data.blog;
  }

}
