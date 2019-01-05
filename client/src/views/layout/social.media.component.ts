import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SessionProvider } from '@portal/core';
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
    public cookiesAccepted: boolean = true;

    constructor(
      private blogService: BlogControllerService,
      private activityService: ActivityControllerService,
      private sanitizer: DomSanitizer,
      private sessionProvider: SessionProvider) {
        this.sessionProvider.value
        .subscribe((next) => this.cookiesAccepted = next.cookiesAccepted);
      }

    getWhatsAppText() {
        return this.sanitizer.bypassSecurityTrustResourceUrl(
          'whatsapp://send?text=Kennst%20du%20das%20schon%20'
          + window.location.href);
    }

    like(): void {
      switch (this.modelName) {
        case 'BlogModel':
          if (!this.sessionProvider.isLiked(this.entity.id)) {
            this.sessionProvider.like(this.entity.id);
            this.entity.likes++;
            this.blogService
            .blogControllerIncreaseLike(this.entity.id).subscribe();
          }
          break;
        case 'ActivityModel':
          if (!this.sessionProvider.isLiked(this.entity.id)) {
            this.sessionProvider.like(this.entity.id);
            this.entity.likes++;
            this.activityService
            .activityControllerIncreaseLike(this.entity.id).subscribe();
          }
          break;
      }
    }

    isMobile(): boolean {
      if (/mobile/i.test(navigator.userAgent)) {
              return true;
      }
      return false;
  }
}
