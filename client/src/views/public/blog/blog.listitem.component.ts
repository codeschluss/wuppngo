import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'blog-list-item',
    styleUrls: ['blog.component.css'],
    templateUrl: 'blog.listitem.component.html'
})

export class BlogListItemComponent {

  public static readonly imports = [];

  @Input()
  public blog: any;

  constructor(
    private router: Router
  ) {}

  openBlogView(): void {
    this.router.navigate(['/view/blogs/', this.blog.id]);
  }

  getDate(date: string): string {
    return new Date(date).toLocaleDateString('de-DE');
  }

  openActivityView(): void {
        this.router.navigate(['/view/activities/', this.blog.activity.id]);
  }
}
