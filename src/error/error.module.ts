import { ErrorHandler, NgModule, Type } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CoreModule, PlatformCommonModule } from '@wooportal/core';
import { ErrorBarComponent } from './bar/error.bar';
import { ErrorDialogComponent } from './dialog/error.dialog';
import { ClientErrorHandler } from './handler/error.handler';

const dialogs: Type<any>[] = [
  ErrorBarComponent,
  ErrorDialogComponent
];

const materials: Type<any>[] = [
  MatButtonModule,
  MatDialogModule,
  MatSnackBarModule
];

@NgModule({
  declarations: [
    ...dialogs
  ],
  entryComponents: [
    ...dialogs
  ],
  imports: [
    ...materials,
    CoreModule,
    PlatformCommonModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: ClientErrorHandler }
  ]
})

export class ErrorModule { }