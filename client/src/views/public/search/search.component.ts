import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudGraph, CrudJoiner, CrudResolver } from '@portal/core';
import { mergeMap } from 'rxjs/operators';
import { ActivityModel } from 'src/realm/activity/activity.model';
import { ActivityProvider } from 'src/realm/activity/activity.provider';
import { BlogModel } from 'src/realm/blog/blog.model';
import { BlogProvider } from 'src/realm/blog/blog.provider';
import { OrganisationModel } from 'src/realm/organisation/organisation.model';
import { OrganisationProvider } from 'src/realm/organisation/organisation.provider';
import { PageModel } from 'src/realm/page/page.model';
import { PageProvider } from 'src/realm/page/page.provider';

@Component({
    selector: 'search-component',
    styleUrls: ['search.component.scss'],
    templateUrl: 'search.component.html'
})

export class SearchComponent {

  public query: string;
  public activities: ActivityModel[] = [];
  public organisations: OrganisationModel[] = [];
  public blogs: BlogModel[] = [];
  public pages: PageModel[] = [];

  constructor(
    private route: ActivatedRoute,
    private organisationProvider: OrganisationProvider,
    private activityProvider: ActivityProvider,
    private blogProvider: BlogProvider,
    private pageProvider: PageProvider,
    private crudResolver: CrudResolver
    ) {

      this.route.params.subscribe(params => {
        this.query = params['query'];
        console.log('constructor: ' + this.query);
        this.getResults();
      });
    }

  public getResults() {
    if (this.query) {
      this.getActivityResults();
      this.getOrganisationResults();
      this.getBlogResults();
      this.getPageResults();
    }
  }

  // ActivityResults start
  public getActivityResults(): void {
    const graph = CrudJoiner.of(ActivityModel)
    .with('category')
    .with('address').yield('suburb')
    .with('schedules').graph;

    const params = {
      filter: this.query,
      embeddings: this.embed(graph)
    };

    this.basicAct(graph, params);
  }

  private basicAct(graph: CrudGraph, params: any): void {
    this.activityProvider.readAll(params).pipe(mergeMap(
      (acts: any) => this.crudResolver.refine(acts, graph))
  ).subscribe(
    (acts: any) => this.activities = acts,
    () => this.activities = []);
  }

  // OrganisationResults start

  public getOrganisationResults(): void {
    const graph = CrudJoiner.of(OrganisationModel)
      .with('address').yield('suburb')
      .with('images').graph;

    const params = {
      filter: this.query,
      embeddings: this.embed(graph),
      approved: true
    };

    this.basicOrga(graph, params);
  }

  private basicOrga(graph: CrudGraph, params: any): void {
    this.organisationProvider.readAll(params).pipe(mergeMap(
      (orgas: any) => this.crudResolver.refine(orgas, graph))
  ).subscribe(
    (orgas: any) => this.organisations = orgas,
    () => this.organisations = []);
  }

  // OrganisationResults end

  // BlogResults start

  public getBlogResults(): void {
    // TODO: include transient field
    const graph = CrudJoiner.of(BlogModel).with('activity')
    .graph;

    const params = {
      filter: this.query,
      embeddings: this.embed(graph)
    };

    this.basicBlog(graph, params);
  }


  private basicBlog(graph: CrudGraph, params: any) {
    this.blogProvider.readAll(params).pipe(mergeMap(
      (blogs: any) => this.crudResolver.refine(blogs, graph))
  ).subscribe(
    (blogs: any) => this.blogs = blogs,
    () => this.blogs = []);
  }


  // BlogResults end

  // PageResults start

  public getPageResults(): void {
    const graph = CrudJoiner.of(PageModel).with('topic')
    .graph;

    const params = {
      filter: this.query,
      embeddings: this.embed(graph)
    };

    this.basicPage(graph, params);
  }


  private basicPage(graph: CrudGraph, params: any) {
    this.pageProvider.readAll(params).pipe(mergeMap(
      (pages: any) => this.crudResolver.refine(pages, graph))
  ).subscribe(
    (pages: any) => this.pages = pages,
    () => this.pages = []);
  }

  // PageResults end


  private embed(tree: CrudGraph): string {
    const embedder = (nodes) => nodes.map((node) => ({
      name: node.name,
      nodes: embedder(node.nodes)
    }));

    return btoa(JSON.stringify(embedder(tree.nodes)));
  }



}
