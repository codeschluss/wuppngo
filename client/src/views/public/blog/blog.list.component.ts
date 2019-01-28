import { Component, OnInit } from '@angular/core';
import { CrudGraph, CrudJoiner, CrudResolver, StrictHttpResponse } from '@portal/core';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { BlogModel } from 'src/realm/blog/blog.model';
import { BlogProvider } from 'src/realm/blog/blog.provider';
import { ListComponent } from 'src/views/list.component';

@Component({
    selector: 'blog-list-component',
    styleUrls: ['blog.component.css'],
    templateUrl: 'blog.list.component.html'
})

export class BlogListComponent extends ListComponent implements OnInit {

  public static readonly imports = [];

  public blogs: BlogModel[] = [];

  private graph: CrudGraph = CrudJoiner.of(BlogModel).with('activity').graph;

  constructor(
    private blogProvider: BlogProvider,
    private crudResolver: CrudResolver
  ) {
    super();
  }

  ngOnInit(): void {
    this.complex();
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
      mergeMap((blogs: any) => this.crudResolver.refine(blogs, this.graph)),
      catchError(() => of([]))
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
    this.complex();
  }

  previousPage(): void {
    this.blogs = null;
    this.pageNumber--;
    this.complex();
  }

}
