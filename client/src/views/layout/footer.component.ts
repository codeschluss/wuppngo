import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SessionProvider } from '@portal/core';
import { ImprintDialogComponent } from './imprint.dialog.component';

@Component({
    selector: 'footer-component',
    styleUrls: ['layout.component.scss'],
    templateUrl: 'footer.component.html'
})

export class FooterComponent {

    public static readonly imports = [MatDialog];
    public instagramUrl: string;

    // TODO: Store cookie acceptance
    public cookiesAccepted: boolean = true;

    constructor(
        public dialog: MatDialog,
        private sessionProvider: SessionProvider) {
          this.sessionProvider.value
          .subscribe((next) => this.cookiesAccepted = next.isCookieAccepted);
    }

    openImprintDialog(): void {
        const dialogRef = this.dialog.open(ImprintDialogComponent, {
          width: '80vh',
        });

        dialogRef.afterClosed().subscribe(result => {
        });
    }

    isMobile(): boolean {
        if (/mobile/i.test(navigator.userAgent)) {
                return true;
        }
        return false;
    }

    sendWhatsAppText() {
        window.location.href =  'whatsapp://send?text=kennst%20du%20schon%20'
            + window.location.origin + '?';
    }

}
