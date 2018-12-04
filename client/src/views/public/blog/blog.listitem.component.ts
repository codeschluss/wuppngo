import { Component, Input } from '@angular/core';
import { BlogModel } from 'src/core/models/blog.model';
import { Router } from '@angular/router';

@Component({
    selector: 'blog-list-item',
    styleUrls: ['blog.component.css'],
    templateUrl: 'blog.listitem.component.html'
})

export class BlogListItemComponent {

  public static readonly imports = [];

  @Input()
  public blog: BlogModel;

  constructor(
    private router: Router
  ) {
  }

  openBlogView(): void {
        this.router.navigate(['/view/blogs/', this.blog.id]);
  }

  openActivityView(): void {
    this.blog.activity.then(activity => {
        this.router.navigate(['/view/activities/', activity.id]);
    });
  }
}
