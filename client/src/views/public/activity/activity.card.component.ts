import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
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
  ) { }

  getNextdate(date: string): string {
    return new Date(date).toLocaleDateString('de-DE');
  }

  getCategoryImageURI(categoryName: string): string {
    const uri = '/imgs/categories/' + categoryName + '.svg';
    if (this.ImageExists(uri)) {
      return uri;
    } else {
      return '/imgs/categories/events.svg';
    }
  }

  openActivityView(): void {
    this.router.navigate(['/view/activities/', this.activity.id]);
  }

  ImageExists(url: string): boolean {
    const img = new Image();
    img.src = url;
    return img.height !== 0;
  }

}
