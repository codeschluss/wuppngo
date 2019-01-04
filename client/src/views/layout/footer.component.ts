import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ImprintDialogComponent } from './imprint.dialog.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'footer-component',
    styleUrls: ['layout.component.scss'],
    templateUrl: 'footer.component.html'
})

export class FooterComponent {

    public static readonly imports = [MatDialog];
    public instagramUrl: string;

    constructor(
        public dialog: MatDialog,
        private sanitizer: DomSanitizer
        ) {}

    openImprintDialog(): void {
        const dialogRef = this.dialog.open(ImprintDialogComponent, {
          width: '80vh',
        });

        dialogRef.afterClosed().subscribe(result => {
        });
    }

    getWhatsAppText() {
        return this.sanitizer.bypassSecurityTrustResourceUrl(
            'whatsapp://send?text=kennst%20du%20schon%20www.wuppngo.de?');
    }

}
