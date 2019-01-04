import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  styleUrls: ['about.component.css'],
  templateUrl: 'about.component.html'
})

export class AboutComponent implements OnInit {

  public activities: any[];

  public index = 0;
  public speed = 5000;
  public infinite = false;
  public direction = 'right';
  public directionToggle = true;
  public autoplay = false;

  public portalSubtitle;


  constructor(
    public route: ActivatedRoute,
  ) {}

  public ngOnInit() {
    this.activities = this.route.snapshot.data.activities;
    const configurations = this.route.snapshot.data.configurations;

    this.portalSubtitle =
    configurations.find(item => item.item === 'portalSubtitle').value;
  }

}
