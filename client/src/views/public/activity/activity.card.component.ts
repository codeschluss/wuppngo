import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ActivityModel } from 'src/realm/activity/activity.model';
import { ScheduleModel } from 'src/realm/schedule/schedule.model';

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

  getNextdate(schedules: ScheduleModel[]): string {
    if (schedules.length && schedules.length > 0) {
      const nextSchedule: string = schedules
        .filter(schedule => new Date(schedule.startDate) >= new Date())
        .reduce((prev, current) =>
          prev.startDate > current.startDate ? current : prev)
        .startDate;
      return moment(nextSchedule).format('L');
    }
  }

  getCategoryImageURI(categoryName: string): string {
    const uri = '/imgs/categories/' + categoryName + '.svg';
    return uri;
  }

  openActivityView(): void {
    this.router.navigate(['/view/activities/', this.activity.id]);
  }
}
