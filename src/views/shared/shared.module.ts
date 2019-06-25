import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BaseModule } from '../../base/base.module';
import { DrawerCompatComponent } from './compat/drawer/drawer.compat';
import { IconCompatComponent } from './compat/icon/icon.compat';
import { NavbarCompatComponent } from './compat/navbar/navbar.compat';
import { LayoutComponent } from './layout/layout.component';

const compat: Type<any>[] = [
  DrawerCompatComponent,
  IconCompatComponent,
  NavbarCompatComponent
];

const components: Type<any>[] = [
  LayoutComponent
];

const materials: Type<any>[] = [
  FlexLayoutModule,
  FontAwesomeModule,
  MatButtonModule,
  MatDialogModule,
  MatSnackBarModule,
  MatInputModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule
];

@NgModule({
  declarations: [
    ...compat,
    ...components
  ],
  exports: [
    ...compat
  ],
  imports: [
    ...materials,
    BaseModule,
    CommonModule,
    RouterModule
  ]
})

export class SharedModule { }
