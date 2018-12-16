import { Component, ViewChild, OnInit, OnDestroy, AfterViewInit, OnChanges, ViewChildren, AfterViewChecked } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ActivityModel } from '../../../realm/activity/activity.model';
import { CategoryModel } from '../../../realm/category/category.model';
import { SuburbModel } from '../../../realm/suburb/suburb.model';
import { TargetGroupModel } from '../../../realm/target-group/target-group.model';
import { MappingComponent } from '../mapping/mapping.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityProvider } from 'src/realm/activity/activity.provider';
import { CrudResolver, CrudJoiner, CrudGraph } from '@portal/core';
import { StrictHttpResponse } from 'src/api/strict-http-response';
import { ListComponent } from 'src/views/list.component';
import { mergeMap, tap, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { MatSelectModule, MatFormFieldModule } from '@angular/material';


@Component({
  styleUrls: ['activity.list.component.css'],
  templateUrl: 'activity.list.component.html'
})

export class ActivityListComponent extends ListComponent implements OnInit {

  public static readonly imports = [
    MatSelectModule,
    MatFormFieldModule
  ];

  public activities: ActivityModel[];
  public mapActivities: ActivityModel[] = [];
  public suburbs: Observable<SuburbModel[]>;
  public categories: Observable<CategoryModel[]>;
  public target_groups: Observable<TargetGroupModel[]>;
  public hoveredActivities: ActivityModel[];
  public showMap: boolean;
  private categoryFilter: string[] = [];
  // private suburbFilter: string[];
  // private targetGroupFilter: string[];

  @ViewChild(MappingComponent)
  private mapping: MappingComponent;

  private graph: CrudGraph = CrudJoiner.of(ActivityModel)
    .with('schedules')
    .with('category')
    .with('address').yield('suburb').graph;

  public suburbCtrl = new FormControl();
  public targetGroupCtrl = new FormControl();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private activityProvider: ActivityProvider,
    private crudResolver: CrudResolver
    ) {
    super();
  }

  ngOnInit(): void {
    this.retrieveData();
    this.suburbs = this.route.snapshot.data.suburbs;
    this.target_groups = this.route.snapshot.data.targetGroups;
    this.categories = this.route.snapshot.data.categories;
    this.suburbCtrl.valueChanges.subscribe(() => this.updateFilterResults());
    this.targetGroupCtrl.valueChanges.subscribe(() =>
      this.updateFilterResults());
  }

  public updateFilterResults() {
    this.pageNumber = 0;
    this.showMap = false;
    this.activities = null;
    this.retrieveData();
  }

  public retrieveData() {
    this.basic();
    this.complex();
  }

  private isActiveCategory(id: string): boolean {
    return this.categoryFilter.find(item => item === id) ? true : false;
  }

  private basic(): void {
    this.activityProvider.readAll({
      embeddings: CrudJoiner.to(this.graph),
      page: this.pageNumber,
      size: this.pageSize,
      sort: 'name',
      categories: this.categoryFilter,
      targetgroups: this.targetGroupCtrl.value,
      suburbs: this.suburbCtrl.value
      }).pipe(mergeMap(
        (acts: any) => this.crudResolver.refine(acts, this.graph))
    ).subscribe((acts: any) => {}, () => {
      console.log('nothing found'); });
  }

  private complex(): void {
    const provider = this.activityProvider.system;
    provider.call(provider.methods.readAll, {
      embeddings: CrudJoiner.to(this.graph),
      page: this.pageNumber,
      size: this.pageSize,
      sort: 'name',
      categories: this.categoryFilter,
      targetgroups: this.targetGroupCtrl.value,
      suburbs: this.suburbCtrl.value
    }).pipe(
      tap((response) => this.intercept(response as any)),
      map((response) => provider.cast(response)),
      mergeMap((acts: any) => this.crudResolver.refine(acts, this.graph))
    ).subscribe((acts: any) => {
      this.activities = acts;
      console.log(acts);
    }, () => {
      this.activities = [];
      console.log('nothing found'); });
  }

  public toggleCategoryFilter(id: string) {
    if (this.categoryFilter.find(item => item === id)) {
      this.removeFromCategoryFilter(id);
    } else {
      this.categoryFilter.push(id);
      this.updateFilterResults();
    }
  }

  public removeFromCategoryFilter(id: string) {
    this.categoryFilter = this.categoryFilter.filter(itemID => itemID === id);
    this.updateFilterResults();
  }

  // public addToSuburbFilter(id: string) {
  //   this.suburbFilter.push(id);
  //   this.retrieveData();
  // }

  // public removeFromSuburbFilter(id: string) {
  //   this.suburbFilter = this.suburbFilter.filter(itemID => itemID === id);
  //   this.retrieveData();
  // }

  // public addToTargetGroupFilter(id: string) {
  //   this.targetGroupFilter.push(id);
  //   this.retrieveData();
  // }

  // public removeFromTargetGroupFilter(id: string) {
  //   this.targetGroupFilter =
  //     this.targetGroupFilter.filter(itemID => itemID === id);
  //   this.retrieveData();
  // }

  private intercept(response: StrictHttpResponse<any>) {
    console.log(response);
    this.totalPages = response.body.page.totalPages;
    this.pageNumber = response.body.page.number;
    this.pageSize = response.body.page.size;
  }

  nextPage(): void {
    this.showMap = false;
    this.activities = null;
    this.pageNumber++;
    this.retrieveData();
  }

  previousPage(): void {
    this.showMap = false;
    this.activities = null;
    this.pageNumber--;
    this.retrieveData();
  }

  // Map related methods:

  navigateToMap(): void {
    this.router.navigate(['/list/activities/map']);
  }

  showOnMap(activity: any): void {
    if (this.mapping && this.mapping.activities) {
      this.mapping.highlightPin(activity);
    }
  }

  handleMapHover(event: ActivityModel[]): void {
    this.hoveredActivities = event;
  }

  // getOpacity(id: string): number {
  //   if (this.hoveredActivities) {
  //     if (this.hoveredActivities.find(act => act.id === id)) {
  //       return 1;
  //     }
  //     return 0.5;
  //   } else {
  //     return 1;
  //   }
  // }

  resetHighlighting(): void {
    if (this.mapping) {
      this.mapping.unHighlightPins();
    }
  }

}
