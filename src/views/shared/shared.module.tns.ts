import { NgModule, NO_ERRORS_SCHEMA, Type } from '@angular/core';
import { CoreModule, PlatformRouterModule } from '@wooportal/core';
import { NativeScriptCommonModule as PlatformCommonModule } from 'nativescript-angular/common';
import { NgRippleModule } from 'nativescript-ng-ripple';
import { NativeScriptUICalendarModule } from 'nativescript-ui-calendar/angular/calendar-directives';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular/side-drawer-directives';
import { CalendarCompatComponent } from './compat/calendar/calendar.compat';
import { DrawerCompatComponent } from './compat/drawer/drawer.compat';
import { ExpandCompatComponent } from './compat/expand/expand.compat';
import { IconCompatComponent } from './compat/icon/icon.compat';
import { MarkedCompatComponent } from './compat/marked/marked.compat';
import { NavbarCompatComponent } from './compat/navbar/navbar.compat';
import { PagerCompatComponent } from './compat/pager/pager.compat';
import { SelectCompatComponent, SelectCompatDialogComponent } from './compat/select/select.compat.tns';
import { LayoutComponent } from './layout/layout.component';

const compat: Type<any>[] = [
  CalendarCompatComponent,
  DrawerCompatComponent,
  ExpandCompatComponent,
  IconCompatComponent,
  MarkedCompatComponent,
  NavbarCompatComponent,
  PagerCompatComponent,
  SelectCompatComponent
];

const components: Type<any>[] = [
  LayoutComponent
];

const dialogs: Type<any>[] = [
  SelectCompatDialogComponent
];

const materials: Type<any>[] = [
  NativeScriptUICalendarModule,
  NativeScriptUISideDrawerModule,
  NgRippleModule
];

@NgModule({
  declarations: [
    ...compat,
    ...components,
    ...dialogs
  ],
  entryComponents: [
    ...dialogs
  ],
  exports: [
    ...compat
  ],
  imports: [
    ...materials,
    CoreModule,
    PlatformCommonModule,
    PlatformRouterModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})

export class SharedModule { }
