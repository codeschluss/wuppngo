import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'orga-media-dialog',
    templateUrl: 'organisation.mediacontent.dialog.component.html',
    styleUrls: ['organisation.mediacontent.component.scss']
  })
  export class OrgaMediaDialogComponent {

    index = 0;
    speed = 5000;
    infinite = false;
    direction = 'right';
    directionToggle = true;
    autoplay = false;
    images: any[];
    videoUrl: SafeResourceUrl;

    constructor(
      private _sanitizer: DomSanitizer,
      public dialogRef: MatDialogRef<OrgaMediaDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
      ) {
        if (data.videoUrl) {
          this.videoUrl =
          _sanitizer.bypassSecurityTrustResourceUrl(
            data.videoUrl.replace('watch?v=', 'embed/'));
        }
        this.images = data.images;
      }

    onNoClick(): void {
      this.dialogRef.close();
    }

}
