import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

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
  ) {
    moment.locale('de');
  }

  openBlogView(): void {
    this.router.navigate(['/view/blogs/', this.blog.id]);
  }

  getDate(date: string): string {
    return moment(date).format('L');
  }

  openActivityView(): void {
    this.router.navigate(['/view/activities/', this.blog.activity.id]);
  }
}
