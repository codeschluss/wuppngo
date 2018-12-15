import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActivatedRoute } from '@angular/router';
import { AddressModel } from '../../../realm/address/address.model';
import { OrganisationModel } from '../../../realm/organisation/organisation.model';
import { ScheduleModel } from '../../../realm/schedule/schedule.model';
import { TargetGroupModel } from '../../../realm/target-group/target-group.model';
import { BottomSheetMapComponent } from '../mapping/map.bottomsheet.component';
import { BottomSheetScheduleComponent } from './schedules.bottom.sheet.component';
import { BlogModel } from 'src/core/models/blog.model';
import { ActivityModel } from 'src/realm/activity/activity.model';
import { Observable } from 'rxjs';


@Component({
  styleUrls: ['activity.view.component.scss'],
  templateUrl: 'activity.view.component.html'
})

export class ActivityViewComponent {

  public static readonly imports = [];
  public activity: Observable<ActivityModel>;
  public viewSchedules: boolean;
  public organisation: OrganisationModel;
  public targetGroups: TargetGroupModel[];
  public address: AddressModel;
  public blogs: BlogModel[] = [];

  constructor(
    private bottomSheet: MatBottomSheet,
    route: ActivatedRoute,
  ) {
    this.activity = route.snapshot.data.activity;
  }

  getNextdate(date: string): string {
    return new Date(date).toLocaleDateString('de-DE');
  }

  getNextdateTime(date: string): string {
    return new Date(date).toLocaleTimeString('de-DE').substring(0, 5);
  }

  buildTestBlog(): BlogModel {
    const blog = new BlogModel;
    blog.author = 'Franz test';
    blog.creationDate = new Date().toDateString();
    blog.postText = 'Lorem ipsum ' +
    'dolor sit amet, consetetur sadipscing elitr, sed ' +
    'diam nonumy eirmod tempor invidunt ut labore et ' +
    'dolore magna aliquyam erat, sed diam voluptua. At ' +
    'vero eos et accusam et justo duo dolores et ea rebum. ' +
    'Stet clita kasd gubergren, no sea takimata sanctus est ' +
    'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, ' +
    'consetetur sadipscing elitr, sed diam nonumy eirmod tempor ' +
    'invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ' +
    'At vero eos et accusam et justo duo dolores et ea rebum. Stet clita ' +
    'kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.';
    blog.title = 'Great Test Blogpost';
    return blog;
  }

  openBottomSheetSchedules(schedules: ScheduleModel[]): void {
      this.bottomSheet.open(BottomSheetScheduleComponent,
        { data: { schedules: schedules } });
  }

  openBottomSheetMap(): void {
    this.bottomSheet.open(BottomSheetMapComponent,
      { data: { activities: [this.activity] } });
    }

}
