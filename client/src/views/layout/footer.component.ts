import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ImprintDialogComponent } from './imprint.dialog.component';

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
        ) {}

    openImprintDialog(): void {
        const dialogRef = this.dialog.open(ImprintDialogComponent, {
          width: '80vh',
        });

        dialogRef.afterClosed().subscribe(result => {
        });
    }

    getWhatsAppText(): string {
        return 'Kennst du das schon? ' + window.location.origin;
    }

}
