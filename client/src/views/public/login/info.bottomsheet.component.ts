import { AfterViewInit, Component, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';

@Component({
  selector: 'info-bottom-sheet',
  template: `
  <div [style.height]="'10vh'" [style.text-align]="'center'">
    <ng-container [ngSwitch]="message">
      <ng-container *ngSwitchCase="'successfullResetPassword'">
        <i18n i18n="@@successfullResetPassword">successfullResetPassword</i18n>
      </ng-container>
      <ng-container *ngSwitchCase="'genericErrorMessage'">
        <i18n i18n="@@genericErrorMessage">genericErrorMessage</i18n>
      </ng-container>
      <ng-container *ngSwitchCase="'enterUserName'">
        <i18n i18n="@@enterUserName">enterUserName</i18n>
      </ng-container>
      <ng-container *ngSwitchCase="'successfullRegister'">
        <i18n i18n="@@successfullRegister">successfullRegister</i18n>
      </ng-container>
      <ng-container *ngSwitchCase="'successfullyLoggedOut'">
      <i18n i18n="@@successfullyLoggedOut">successfullyLoggedOut</i18n>
      </ng-container>
      <ng-container *ngSwitchCase="'successfullyLoggedIn'">
        <i18n i18n="@@successfullyLoggedIn">successfullyLoggedIn</i18n>
      </ng-container>
      <ng-container *ngSwitchCase="'createMissingOrganisation'">
        <i18n
          i18n="@@createMissingOrganisation">createMissingOrganisation</i18n>
      </ng-container>
    </ng-container>
  </div>
  `
})

export class InfoBottomComponent implements AfterViewInit {

    public message: string;

    constructor(
        @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
        private bottomSheetRef: MatBottomSheetRef<InfoBottomComponent>) {
        this.message = data.message;
    }

    ngAfterViewInit() {
      setTimeout(() => this.bottomSheetRef.dismiss(), 3000);
    }


}
