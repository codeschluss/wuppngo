import { Component, OnInit } from '@angular/core';
import { BlogModel } from 'src/realm/blog/blog.model';
import { CrudResolver, CrudJoiner, CrudGraph, StrictHttpResponse } from '@portal/core';
import { BlogProvider } from 'src/realm/blog/blog.provider';
import { ListComponent } from 'src/views/list.component';
import { mergeMap, tap, map } from 'rxjs/operators';

@Component({
    selector: 'blog-list-component',
    styleUrls: ['blog.component.css'],
    templateUrl: 'blog.list.component.html'
})

export class BlogListComponent extends ListComponent implements OnInit {

  public static readonly imports = [];
  public blogs: BlogModel[] = [];
  private graph: CrudGraph = CrudJoiner.of(BlogModel).graph;

  constructor(
    private blogProvider: BlogProvider,
    private crudResolver: CrudResolver
  ) {
    super();
  }

  ngOnInit(): void {
    this.basic();
    this.complex();
  }

  private basic(): void {
    this.blogProvider.readAll({
      page: this.pageNumber,
      size: this.pageSize,
      sort: 'title'
    }).pipe(mergeMap(
      (blogs: any) => this.crudResolver.refine(blogs, this.graph))
    ).subscribe((blogs: any) => console.log('basic', blogs));
  }

  private complex(): void {
    const provider = this.blogProvider.system;
    provider.call(provider.methods.readAll, {
      page: this.pageNumber,
      size: this.pageSize,
      sort: 'title'
    }).pipe(
      tap((response) => this.intercept(response as any)),
      map((response) => provider.cast(response)),
      mergeMap((blogs: any) => this.crudResolver.refine(blogs, this.graph))
    ).subscribe((blogs: any) => this.blogs = blogs);
  }

  private intercept(response: StrictHttpResponse<any>) {
    this.totalPages = response.body.page.totalPages;
    this.pageNumber = response.body.page.number;
    this.pageSize = response.body.page.size;
  }


  nextPage(): void {
    this.blogs = null;
    this.pageNumber++;
    this.basic();
    this.complex();
  }

  previousPage(): void {
    this.blogs = null;
    this.pageNumber--;
    this.basic();
    this.complex();
  }

}
