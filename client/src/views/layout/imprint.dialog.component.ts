import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'imprint-dialog',
    templateUrl: 'imprint.dialog.component.html',
  })
  export class ImprintDialogComponent {

    public text: string;

    constructor(
      public dialogRef: MatDialogRef<ImprintDialogComponent>,
      ) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

   public getTextContent(): string {
    return 'placeholder text';
   }

}
