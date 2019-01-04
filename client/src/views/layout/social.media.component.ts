import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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

    // TODO: Store cookie acceptance
    public cookiesDenied: boolean = true;

    constructor(
      private blogService: BlogControllerService,
      private activityService: ActivityControllerService,
      private sanitizer: DomSanitizer) {}

    getWhatsAppText() {
        return this.sanitizer.bypassSecurityTrustResourceUrl(
          'whatsapp://send?text=Kennst%20du%20das%20schon%20'
          + window.location.href);
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
          return true;
        } else {
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

    isMobile(): boolean {
      if (/mobile/i.test(navigator.userAgent)) {
              return true;
      }
      return false;
  }
}
