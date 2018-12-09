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
    public constructor(public dialog: MatDialog) {}

    openImprintDialog(): void {
        const dialogRef = this.dialog.open(ImprintDialogComponent, {
          width: '250px'
        });

        dialogRef.afterClosed().subscribe(result => {
        });
      }

}
