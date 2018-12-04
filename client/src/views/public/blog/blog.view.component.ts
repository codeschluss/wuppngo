import { Component, Input } from '@angular/core';
import { BlogModel } from 'src/core/models/blog.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ScheduleModel } from 'src/core/models/schedule.model';
import { OrganisationModel } from 'src/core/models/organisation.model';
import { TargetGroupModel } from 'src/core/models/target-group.model';
import { CategoryModel } from 'src/core/models/category.model';
import { SuburbModel } from 'src/core/models/suburb.model';
import { AddressModel } from 'src/core/models/address.model';
import { ActivityModel } from 'src/core/models/activity.model';

@Component({
    selector: 'blog-view',
    styleUrls: ['blog.component.css'],
    templateUrl: 'blog.view.component.html'
})

export class BlogViewComponent {

  public static readonly imports = [];
  public blog: BlogModel;

  constructor(
    private router: Router,
    route: ActivatedRoute,
  ) {
    // just for testing
    this.blog = this.buildTestBlog();
    // const id  = route.paramMap.pipe(
    //   switchMap((params: ParamMap) => activityProvider
    //     .findOne(params.get('id')).then(
    //       act => {
    //         this.activity = act;
    //         act.address.then(address => this.address = address);
    //         this.activity.organisation.then(
    //           orga => this.organisation = orga);
    //         this.activity.targetGroups.then(
    //           targetGroups => this.targetGroups = targetGroups);
    //         this.activity.address.then(
    //           address => this.address = address);
    //         this.activity.schedules.then(
    //           schedules => this.schedules = schedules);
    //       }
    //     ))
    // ).subscribe();
  }

  openActivityView(): void {
    this.blog.activity.then(activity => {
        this.router.navigate(['/view/activities/', activity.id]);
    });
  }

  buildTestBlog(): BlogModel {
    const blog = new BlogModel;
    blog.id = '0001';
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


  buildTestActivity(): ActivityModel {
    const actOne = new ActivityModel;
    actOne.id = 'testActivity';
    actOne.name = 'FakeActivity';
    actOne.description = 'This is just a FakeActivity to show'
      + 'how this could look like.';
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

    actOne.targetGroups = new Promise<TargetGroupModel[]>((resolve, reject) => {
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
    actOne.organisation = new Promise<OrganisationModel>((resolve, reject) => {
      resolve(organisation);
    });

    return actOne;
}

}
