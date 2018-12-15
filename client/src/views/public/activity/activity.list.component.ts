import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivityModel } from '../../../realm/activity/activity.model';
import { CategoryModel } from '../../../realm/category/category.model';
import { SuburbModel } from '../../../realm/suburb/suburb.model';
import { TargetGroupModel } from '../../../realm/target-group/target-group.model';
import { MappingComponent } from '../mapping/mapping.component';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  styleUrls: ['activity.list.component.css'],
  templateUrl: 'activity.list.component.html'
})

export class ActivityListComponent {

  public static readonly imports = [];

  public activities: Observable<ActivityModel[]>;
  public suburbs: Observable<SuburbModel[]>;
  public categories: Observable<CategoryModel[]>;
  public target_groups: Observable<TargetGroupModel[]>;
  public hoveredActivities: ActivityModel[];
  // public route: ActivatedRoute;

  @ViewChild(MappingComponent)
  private mapping: MappingComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router
    ) {
    this.activities = route.snapshot.data.activities;
    this.suburbs = route.snapshot.data.suburbs;
    this.target_groups = route.snapshot.data.targetGroups;
    this.categories = route.snapshot.data.categories;
  }

  navigateToMap(): void {
    this.router.navigate(['/list/activities/map']);
  }

  showOnMap(activity: any): void {
    this.mapping.highlightPin(activity);
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
    this.mapping.unHighlightPins();
  }

}
