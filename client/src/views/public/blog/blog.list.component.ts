import { Component } from '@angular/core';
import { BlogModel } from 'src/core/models/blog.model';
import { Router } from '@angular/router';
import { ActivityModel } from 'src/realm/activity/activity.model';
import { AddressModel } from 'src/realm/address/address.model';
import { SuburbModel } from 'src/realm/suburb/suburb.model';
import { CategoryModel } from 'src/realm/category/category.model';
import { TargetGroupModel } from 'src/realm/target-group/target-group.model';
import { ScheduleModel } from 'src/realm/schedule/schedule.model';
import { OrganisationModel } from 'src/realm/organisation/organisation.model';

@Component({
    selector: 'blog-list-component',
    styleUrls: ['blog.component.css'],
    templateUrl: 'blog.list.component.html'
})

export class BlogListComponent {

  public static readonly imports = [];
  public blogs: BlogModel[] = [];

  constructor(
  ) {
    for (let i = 0; i < 12; i++) {
      this.blogs.push(this.buildTestBlog());
    }
  }

  buildTestBlog(): BlogModel {
    const blog = new BlogModel;
    // blog.id = '0001';
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
    // actOne.id = 'testActivity';
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
    // testSubUrb.id = '1';

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
