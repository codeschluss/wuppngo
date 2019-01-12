import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { ConfigurationModel } from 'src/realm/configuration/configuration.model';
import { ConfigurationProvider } from 'src/realm/configuration/configuration.provider';
import { ActivityModel } from '../../../realm/activity/activity.model';

@Component({
  selector: 'bottom-sheet',
  template: `
  <div id="largeMap"
  [style.height]="'50vh'"
  *ngIf="configurations && activities">
    <mapping-component
      [activities] = activities
      [configurations] = configurations
      [disableCarousel] = "true">
    </mapping-component>
  </div>`,
  styleUrls: ['map.bottomsheet.component.css']
})

export class BottomSheetMapComponent implements OnInit {
  public activities: ActivityModel[];
  public configurations: ConfigurationModel[];

  constructor(
    private configProvider: ConfigurationProvider,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private bottomSheetRef: MatBottomSheetRef<BottomSheetMapComponent>) {
    this.activities = data.activities;
  }

  ngOnInit() {
    this.configProvider.readAll().subscribe(
      configs => this.configurations = configs );
  }

}
