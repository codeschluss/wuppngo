import { AfterViewInit, Component, Input } from '@angular/core';
import { NgxHmCarouselModule } from 'ngx-hm-carousel';
import { ActivityModel } from 'src/realm/activity/activity.model';

@Component({
  selector: 'activity-carousel-component',
  styleUrls: [
    '../carousel.component.scss'
  ],
  templateUrl: 'activity.carousel.component.html'
})

export class ActivityCarouselComponent implements AfterViewInit {

  public static readonly imports = [
    NgxHmCarouselModule
  ];

  @Input()
  public activities: ActivityModel[] = [];

  public clusteredActivities: ActivityModel[][] = [[]];

  index = 0;
  speed = 5000;
  infinite = false;
  direction = 'right';
  directionToggle = true;
  autoplay = false;

  constructor(
  ) { }

  onResize(): void {
    if (document.getElementById('carousel')
      && document.getElementById('carousel').offsetWidth) {
      this.fillCluster(document.getElementById('carousel').offsetWidth);
    }
  }

  ngAfterViewInit(): void {
    if (document.getElementById('carousel')
      && document.getElementById('carousel').offsetWidth) {
      this.fillCluster(document.getElementById('carousel').offsetWidth);
    }
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
