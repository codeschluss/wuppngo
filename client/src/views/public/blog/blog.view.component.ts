import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogModel } from 'src/realm/blog/blog.model';

@Component({
    selector: 'blog-view',
    styleUrls: ['blog.component.css'],
    templateUrl: 'blog.view.component.html'
})

export class BlogViewComponent implements OnInit {

  public static readonly imports = [];
  public blog: BlogModel;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.blog = this.route.snapshot.data.blog;
  }

  public getDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('de-DE');
  }
}
