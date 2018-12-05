import { Component, ViewChild } from '@angular/core';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ActivityProvider } from 'src/realm/activity/activity.provider';
import { ActivityModel } from '../../../realm/activity/activity.model';
import { AddressModel } from '../../../realm/address/address.model';
import { CategoryModel } from '../../../realm/category/category.model';
import { OrganisationModel } from '../../../realm/organisation/organisation.model';
import { ScheduleModel } from '../../../realm/schedule/schedule.model';
import { SuburbModel } from '../../../realm/suburb/suburb.model';
import { TargetGroupModel } from '../../../realm/target-group/target-group.model';
import { BottomSheetMapComponent } from '../mapping/map.bottomsheet.component';
import { MappingComponent } from '../mapping/mapping.component';
import { BottomSheetScheduleComponent } from './schedules.bottom.sheet.component';
import { BlogModel } from 'src/core/models/blog.model';


@Component({
  styleUrls: ['activity.view.component.scss'],
  templateUrl: 'activity.view.component.html',
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'de-DE' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ]
})

export class ActivityViewComponent {

  public static readonly imports = [];
  public activity: ActivityModel;
  public viewSchedules: boolean;
  public organisation: OrganisationModel;
  public targetGroups: TargetGroupModel[];
  public address: AddressModel;
  public blogs: BlogModel[] = [];

  @ViewChild(MappingComponent)
  private mapping: MappingComponent;

  constructor(
    private bottomSheet: MatBottomSheet,
    private adapter: DateAdapter<any>,
    route: ActivatedRoute,
  ) {
    this.activity = route.snapshot.data.activity;
    for (let i = 0; i < 3; i++) {
      this.blogs.push(this.buildTestBlog());
    }
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

  like(): void {
    console.log('I like');
  }

}
