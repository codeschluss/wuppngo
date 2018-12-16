import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { MatTabsModule } from '@angular/material';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, mergeMap, tap, map } from 'rxjs/operators';
import { OrganisationModel } from 'src/realm/organisation/organisation.model';
import { ActivityModel } from 'src/realm/activity/activity.model';
import { ActivityProvider } from 'src/realm/activity/activity.provider';
import { OrganisationProvider } from 'src/realm/organisation/organisation.provider';
import { BlogModel } from 'src/realm/blog/blog.model';
import { BlogProvider } from 'src/realm/blog/blog.provider';
import { CrudJoiner, CrudGraph, CrudResolver, CrudProvider, CrudModel } from '@portal/core';

@Component({
    selector: 'search-list',
    styleUrls: ['search.component.scss'],
    templateUrl: 'searchresult.list.component.html'
})

export class SearchResultListComponent implements OnInit, OnChanges {

  public static readonly imports = [ MatTabsModule ];

  public activities: ActivityModel[] = [];
  public organisations: OrganisationModel[] = [];
  public blogs: BlogModel[] = [];

  @Input()
  public query: string;

  constructor(
    private organisationProvider: OrganisationProvider,
    private activityProvider: ActivityProvider,
    private blogProvider: BlogProvider,
    private crudResolver: CrudResolver
    ) {}

  public ngOnInit() {
    this.getResults();
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['query']) {
      this.getResults();
    }
  }

  public getResults() {
    if (this.query) {
      this.getActivityResults();
      this.getOrganisationResults();
      this.getBlogResults();
    }
  }

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
    this.complexAct(graph, params);
  }

  private basicAct(graph: CrudGraph, params: any): void {
    this.activityProvider.readAll(params).pipe(mergeMap(
      (acts: any) => this.crudResolver.refine(acts, graph))
  ).subscribe(
    () => {},
    () => {});
  }

  private complexAct(graph: CrudGraph, params: any) {
    const provider = this.activityProvider.system;
    provider.call(provider.methods.readAll, params)
    .pipe(
      map((response) => provider.cast(response)),
      mergeMap((acts: any) => this.crudResolver.refine(acts, graph))
    ).subscribe((acts: any) => this.activities = acts,
      () => this.activities = []);
  }

  public getOrganisationResults(): void {
    const graph = CrudJoiner.of(OrganisationModel)
      .with('address').yield('suburb')
      .with('images').graph;

    const params = {
      filter: this.query,
      embeddings: this.embed(graph)
    };

    this.basicOrga(graph, params);
    this.complexOrga(graph, params);
  }

  private basicOrga(graph: CrudGraph, params: any): void {
    this.organisationProvider.readAll(params).pipe(mergeMap(
      (orgas: any) => this.crudResolver.refine(orgas, graph))
  ).subscribe(
    () => {},
    () => {});
  }

  private complexOrga(graph: CrudGraph, params: any) {
    const provider = this.organisationProvider.system;
    provider.call(provider.methods.readAll, params)
    .pipe(
      map((response) => provider.cast(response)),
      mergeMap((orgas: any) => this.crudResolver.refine(orgas, graph))
    ).subscribe((orgas: any) => this.organisations = orgas,
    () => this.organisations = []);
  }

  public getBlogResults(): void {
    // TODO: include transient field
    const graph = CrudJoiner.of(BlogModel)
    // .with('activity')
    .graph;

    const params = {
      filter: this.query,
      embeddings: this.embed(graph)
    };

    this.basicBlog(graph, params);
    this.complexBlog(graph, params);
  }


  private basicBlog(graph: CrudGraph, params: any) {
    this.blogProvider.readAll(params).pipe(mergeMap(
      (orgas: any) => this.crudResolver.refine(orgas, graph))
  ).subscribe(
    () => {},
    () => {});
  }

  private complexBlog(graph: CrudGraph, params: any) {
    const provider = this.blogProvider.system;
    provider.call(provider.methods.readAll, params)
    .pipe(
      map((response) => provider.cast(response)),
      mergeMap((blogs: any) => this.crudResolver.refine(blogs, graph))
    ).subscribe(
      (blogs: any) => this.blogs = blogs,
      () => {console.log('no blogs found'); this.blogs = []; });
  }




  private embed(tree: CrudGraph): string {
    const embedder = (nodes) => nodes.map((node) => ({
      name: node.name,
      nodes: embedder(node.nodes)
    }));

    return btoa(JSON.stringify(embedder(tree.nodes)));
  }
}
