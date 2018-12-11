import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivityProvider } from 'src/realm/activity/activity.provider';
import { Location } from '@angular/common';

@Component({
    selector: 'socail-media-component',
    templateUrl: 'social.media.component.html',
    styleUrls: ['social.media.component.scss']
})

export class SocialMediaComponent {

    @Input()
    public entity: any;

    getWhatsAppText(): string {
        return 'Kennst du das schon? '
            + window.location.href;
    }

    like(): void {
        const likedActivitiesIds
          = window.localStorage.getItem('likedActivitiesIds')
          ? JSON.parse(window.localStorage.getItem('likedActivitiesIds')) : [];

          if (likedActivitiesIds.find(
          actId => this.entity.id === actId)) {
            console.log('allready liked');
          } else {
            likedActivitiesIds.push(this.entity.id);
            window.localStorage.setItem(
              'likedActivitiesIds', JSON.stringify(likedActivitiesIds));

            // pending till server component is ready
            // this.activityProvider.increaseLikes();
          }
      }
}
