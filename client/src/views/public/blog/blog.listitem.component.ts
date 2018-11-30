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

  openActivityView(): void {
    this.blog.activity.then(activity => {
        this.router.navigate(['/public/activities/view/', activity.id]);
    });
  }
}
