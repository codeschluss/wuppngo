import { Component, Input } from '@angular/core';
import { ActivityControllerService } from 'src/api/services/activity-controller.service';
import { BlogControllerService } from 'src/api/services/blog-controller.service';

@Component({
    selector: 'social-media-component',
    templateUrl: 'social.media.component.html',
    styleUrls: ['social.media.component.scss']
})

export class SocialMediaComponent {

    @Input()
    public entity: any;

    @Input()
    public modelName: string;

    constructor(
      private blogService: BlogControllerService,
      private activityService: ActivityControllerService) {}
    getWhatsAppText(): string {
        return 'Kennst du das schon? '
            + window.location.href;
    }

    like(): void {
      switch (this.modelName) {
        case 'BlogModel':
          if (!this.isLiked(this.entity.id)) {
            this.entity.likes++;
            this.storeInStorage(this.entity.id);
            this.blogService
            .blogControllerIncreaseLike(this.entity.id).subscribe();
          }
          break;
        case 'ActivityModel':
          if (!this.isLiked(this.entity.id)) {
            this.entity.likes++;
            this.storeInStorage(this.entity.id);
            this.activityService
            .activityControllerIncreaseLike(this.entity.id).subscribe();
          }
          break;
      }
    }

    public isLiked(modelName: string): boolean {
      const storageName = 'liked' + modelName + 'Ids';
      const likedEntitiesIds
        = window.localStorage.getItem(storageName)
        ? JSON.parse(window.localStorage.getItem(storageName)) : [];

        if (likedEntitiesIds.find(
        entitiyId => this.entity.id === entitiyId)) {
          console.log('already liked');
          return true;
        } else {
          console.log('thats new for you!');
          return false;
        }
      }

    public storeInStorage(modelName: string): void {
    const storageName = 'liked' + modelName + 'Ids';
    const likedEntitiesIds
      = window.localStorage.getItem(storageName)
      ? JSON.parse(window.localStorage.getItem(storageName)) : [];

      likedEntitiesIds.push(this.entity.id);
      window.localStorage.setItem(
        storageName, JSON.stringify(likedEntitiesIds));
    }
}
