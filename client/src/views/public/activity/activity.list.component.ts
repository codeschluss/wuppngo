import { Component, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { ActivityProvider } from 'src/realm/activity/activity.provider';
import { AddressModel } from 'src/realm/address/address.model';
import { CategoryProvider } from 'src/realm/category/category.provider';
import { OrganisationModel } from 'src/realm/organisation/organisation.model';
import { ScheduleModel } from 'src/realm/schedule/schedule.model';
import { SuburbProvider } from 'src/realm/suburb/suburb.provider';
import { TargetGroupProvider } from 'src/realm/target-group/target-group.provider';
import { ActivityModel } from '../../../realm/activity/activity.model';
import { CategoryModel } from '../../../realm/category/category.model';
import { SuburbModel } from '../../../realm/suburb/suburb.model';
import { TargetGroupModel } from '../../../realm/target-group/target-group.model';
import { BottomSheetMapComponent } from '../mapping/map.bottomsheet.component';
import { MappingComponent } from '../mapping/mapping.component';
import { ActivatedRoute } from '@angular/router';


@Component({
  styleUrls: ['activity.list.component.css'],
  templateUrl: 'activity.list.component.html'
})

export class ActivityListComponent {

  public static readonly imports = [];

  public activities: ActivityModel[];
  public suburbs: SuburbModel[];
  public categories: CategoryModel[];
  public target_groups: TargetGroupModel[];

  @ViewChild(MappingComponent)
  private mapping: MappingComponent;

  constructor(
    private bottomSheet: MatBottomSheet,
    route: ActivatedRoute,
  ) {
    this.activities = route.snapshot.data.activities;
    this.suburbs = route.snapshot.data.suburbs;
    this.target_groups = route.snapshot.data.targetGroups;
    this.categories = route.snapshot.data.categories;
  }

  openBottomSheetMap(): void {
    this.bottomSheet.open(BottomSheetMapComponent,
      { data: { activities: this.activities } });
  }

}
