import { Component, ViewChild } from '@angular/core';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ActivityProvider } from 'src/core/providers/activity.provider';
import { ActivityModel } from '../../../core/models/activity.model';
import { AddressModel } from '../../../core/models/address.model';
import { CategoryModel } from '../../../core/models/category.model';
import { OrganisationModel } from '../../../core/models/organisation.model';
import { ScheduleModel } from '../../../core/models/schedule.model';
import { SuburbModel } from '../../../core/models/suburb.model';
import { TargetGroupModel } from '../../../core/models/target-group.model';
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
    private activityProvider: ActivityProvider,
    route: ActivatedRoute,
  ) {
    // const id  = route.paramMap.pipe(
    //   switchMap((params: ParamMap) => activityProvider
    //     .findOne(params.get('id')).then(
    //       act => {
    //         this.activity = act;
    //         act.address.then(address => this.address = address);
    //         this.activity.organisation.then(orga => this.organisation = orga);
    //         this.activity.targetGroups.then(
    //           targetGroups => this.targetGroups = targetGroups);
    //         this.activity.address.then(
    //           address => this.address = address);
    //         this.activity.schedules.then(
    //           schedules => this.schedules = schedules);
    //       }
    //     ))
    // ).subscribe();
    this.activity = this.buildTestActivity();
    for (let i = 0; i < 12; i++) {
      this.blogs.push(this.buildTestBlog());
    }
  }

  buildTestActivity(): ActivityModel {
    const actOne = new ActivityModel;
    actOne.id = 'testActivity';
    actOne.name = 'FakeActivity';
    actOne.description = 'Lorem ipsum ' +
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
    const testAddress = new AddressModel();
    testAddress.street = 'samplestreet';
    testAddress.houseNumber = '42a';
    testAddress.latitude = 51.00;
    testAddress.longitude = 7.00;
    testAddress.postalCode = '63628';

    const testSubUrb = new SuburbModel();
    testSubUrb.name = 'Elberfeld';
    testSubUrb.id = '1';

    testAddress.suburb = new Promise<SuburbModel>((resolve, reject) => {
      resolve(testSubUrb);
    });

    testAddress.place = 'SampleCity';
    actOne.address = new Promise<AddressModel>((resolve, reject) => {
      resolve(testAddress);
    });

    const category = new CategoryModel;
    category.name = 'party';
    category.color = 'blue';

    actOne.category = new Promise<CategoryModel>((resolve, reject) => {
      resolve(category);
    });

    const target_group = new TargetGroupModel;
    target_group.name = 'youth';
    const targetGroups = [target_group];

    actOne.targetGroups =
      new Promise<TargetGroupModel[]>((resolve, reject) => {
      resolve(targetGroups);
    });

    const schedule = new ScheduleModel;
    schedule.startDate = new Date().toUTCString();
    schedule.endDate = new Date().toUTCString();
    const schedules = [schedule];

    const firstDate = new ScheduleModel;
    firstDate.startDate = new Date().toISOString();
    firstDate.endDate =
      new Date(new Date(firstDate.startDate).getDate() + 1).toISOString();

      const secondDate = new ScheduleModel;
    secondDate.startDate = new Date(new Date().getDate() + 7).toISOString();
    secondDate.endDate =
      new Date(new Date(secondDate.startDate).getDate() + 1).toISOString();

    schedules.push(firstDate);
    schedules.push(secondDate);

    actOne.schedules = new Promise<ScheduleModel[]>((resolve, reject) => {
      resolve(schedules);
    });

    const organisation = new OrganisationModel;
    organisation.name = 'testOrganisation';
    organisation.description = 'Lorem ipsum ' +
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
    actOne.organisation =
      new Promise<OrganisationModel>((resolve, reject) => {
      resolve(organisation);
    });

    return actOne;
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
  blog.activity =  new Promise<ActivityModel>((resolve, reject) => {
    resolve(this.buildTestActivity());
  });
  return blog;
}

  openBottomSheetSchedules(): void {
    this.activity.schedules.then(schedules => {
      this.bottomSheet.open(BottomSheetScheduleComponent,
        { data: { schedules: schedules } });
    });
  }

  openBottomSheetMap(): void {
    // this.bottomSheet.open(BottomSheetMapComponent,
    //   { data: { activities: [this.placeHolderActivity] } });
  }

}
