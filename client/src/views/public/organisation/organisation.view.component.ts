import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ActivityModel } from 'src/realm/activity/activity.model';
import { MatDialog } from '@angular/material';
import { OrgaMediaDialogComponent } from './organisation.mediacontent.dialog.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ImageModel } from 'src/realm/image/image.model';

@Component({
  selector: 'organisation-view',
  styleUrls: ['organisation.component.scss'],
  templateUrl: 'organisation.view.component.html'
})

export class OrganisationViewComponent {

  public static readonly imports = [];
  public organisation: any;
  public activities: ActivityModel[] = [];
  public images: any[] = [];
  public videoUrl;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private _sanitizer: DomSanitizer
  ) {
    this.organisation = route.snapshot.data.organisation;
    if (this.organisation.images) {
      this.initOrgaImg(this.organisation.images);
    }
    if (this.organisation.videoUrl) {
      this.videoUrl = this.parseVideo();
      }
  }

  openActivityView(activityId: string): void {
    this.router.navigate(['/view/activities/', activityId]);
  }

  initOrgaImg(imgs: ImageModel[]): void {
    imgs.forEach(img =>
      this.images.push({url: 'data:' + img.mimeType + ';base64,'
      + atob(img.image.toString()), caption: img.caption})
    );
  }

  openImagesPopUp(): void {
    const dialogRef = this.dialog.open(OrgaMediaDialogComponent, {
      width: '90vw',
      data: {
        images: this.images,
        videoUrl: this.videoUrl
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  parseVideo(): SafeResourceUrl {
    const videoUrl = this.organisation.videoUrl;
    if (videoUrl.includes('www.youtube')) {
      return this._sanitizer.bypassSecurityTrustResourceUrl(
        videoUrl.replace('watch?v=', 'embed/'));
    }
    if (videoUrl.includes('vimeo.com')) {
        return this._sanitizer.bypassSecurityTrustResourceUrl(
          videoUrl.replace('https://vimeo.com/',
          'https://player.vimeo.com/video/'));
    }
    if (videoUrl.includes('https://youtu.be/')) {
      return this._sanitizer.bypassSecurityTrustResourceUrl(
        videoUrl.replace('https://youtu.be/',
        'https://www.youtube.com/embed/'));
    }
  }

}
