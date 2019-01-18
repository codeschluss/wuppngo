import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ActivityModel } from 'src/realm/activity/activity.model';

@Component({
  selector: 'activity-card',
  styleUrls: ['activity.card.component.css'],
  templateUrl: 'activity.card.component.html',
})

export class ActivityCardComponent {

  @Input()
  public activity: ActivityModel;

  constructor(
    private router: Router,
  ) {
    moment.locale('de');
   }

   getNextdate(date: string): string {
    return moment(date).format('L');
  }

  getCategoryImageURI(categoryName: string): string {
    const uri = '/imgs/categories/' + categoryName + '.svg';
    return uri;
  }

  openActivityView(): void {
    this.router.navigate(['/view/activities/', this.activity.id]);
  }
}
