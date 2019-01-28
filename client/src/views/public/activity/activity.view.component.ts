import { Component, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ActivityModel } from 'src/realm/activity/activity.model';
import { BlogModel } from 'src/realm/blog/blog.model';
import { ConfigurationModel } from 'src/realm/configuration/configuration.model';
import { ConfigurationProvider } from 'src/realm/configuration/configuration.provider';
import { AddressModel } from '../../../realm/address/address.model';
import { OrganisationModel } from '../../../realm/organisation/organisation.model';
import { ScheduleModel } from '../../../realm/schedule/schedule.model';
import { TargetGroupModel } from '../../../realm/target-group/target-group.model';
import { BottomSheetMapComponent } from '../mapping/map.bottomsheet.component';
import { MappingComponent } from '../mapping/mapping.component';
import { BottomSheetScheduleComponent } from './schedules.bottom.sheet.component';

@Component({
  styleUrls: ['activity.view.component.scss'],
  templateUrl: 'activity.view.component.html'
})

export class ActivityViewComponent implements OnInit {

  public static readonly imports = [];
  public activity: ActivityModel;
  public viewSchedules: boolean;
  public organisation: OrganisationModel;
  public targetGroups: TargetGroupModel[];
  public address: AddressModel;
  public blogs: BlogModel[] = [];
  public configurations: ConfigurationModel[];

  @ViewChild(MappingComponent)
  private mapping: MappingComponent;

  constructor(
    private bottomSheet: MatBottomSheet,
    private route: ActivatedRoute,
    private router: Router,
    private configProvider: ConfigurationProvider
  ) {
    moment.locale('de');
  }

  ngOnInit() {
    this.activity = this.route.snapshot.data.activity;
    this.configProvider.readAll().subscribe(
      configs => this.configurations = configs);
  }

  getNextdate(date: string): string {
    return moment(date).utc().format('L');
  }

  getNextdateTime(date: string): string {
    return moment(date).utc().format('LT');
  }

  openBottomSheetSchedules(schedules: ScheduleModel[]): void {
    this.bottomSheet.open(BottomSheetScheduleComponent,
      { data: { schedules: schedules } });
  }

  openBottomSheetMap(): void {
    this.bottomSheet.open(BottomSheetMapComponent,
      {
        data: {
          activities: [this.activity],
          configurations: this.configurations
        }
      });
  }

  openMap(): void {
    this.router.navigate(['/map/activities/' + this.activity.id]);
  }

}
