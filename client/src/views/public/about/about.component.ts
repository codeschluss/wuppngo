import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  styleUrls: ['about.component.css'],
  templateUrl: 'about.component.html'
})

export class AboutComponent {

  public activities: any[] = [];

  index = 0;
  speed = 5000;
  infinite = false;
  direction = 'right';
  directionToggle = true;
  autoplay = false;

  constructor(
    public route: ActivatedRoute
  ) {
    this.activities = this.route.snapshot.data.activities;
  }

  getAboutPageImageUrl(): string {
    return 'imgs/placeHolder.jpg';
  }

}
