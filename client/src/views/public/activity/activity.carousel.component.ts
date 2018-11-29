import { Component, Input, AfterViewInit, HostListener } from '@angular/core';
import { ActivityModel } from '../../../core/models/activity.model';
import { NgxHmCarouselModule } from 'ngx-hm-carousel';

@Component({
  selector: 'activity-carousel-component',
  styleUrls: [
    'activity.carousel.component.scss'],
  templateUrl: 'activity.carousel.component.html'
})

export class ActivityCarouselComponent implements AfterViewInit {

  public static readonly imports = [
    NgxHmCarouselModule
  ];

  @Input()
  public activities: ActivityModel[];

  public clusteredActivities: ActivityModel[][] = [];

  index = 0;
  speed = 5000;
  infinite = false;
  direction = 'right';
  directionToggle = true;
  autoplay = false;

  constructor() { }

  onResize(event): void {
  const innerWidth = event.target.innerWidth;
  this.fillCluster(innerWidth);
  }

  ngAfterViewInit(): void {
    this.fillCluster(window.innerWidth);
  }

  fillCluster(innerWidth: number): void {
    this.clusteredActivities = [];
    let clusterIndex = 0;
    let clusterSize = innerWidth / 500;
    let index = 0;

    if (innerWidth < 850) {
      clusterSize = 1;
    }

    this.activities.forEach(activity => {
      if (!this.clusteredActivities[clusterIndex]) {
        this.clusteredActivities[clusterIndex] = [];
      }
      this.clusteredActivities[clusterIndex].push(activity);
      index++;
      if (index >= clusterSize) {
        index = 0;
        clusterIndex++;
      }
    });

  }

}
