import { Component } from '@angular/core';
import {
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatDialogModule,
    MatExpansionModule,
    MatButtonModule,
    MatDialog
} from '@angular/material';
import { LangaugeChooserDialogComponent } from './languagecooser.component';
import { Router } from '@angular/router';

@Component({
    selector: 'navbar-component',
    styleUrls: ['layout.component.scss'],
    templateUrl: 'navbar.component.html'
})

export class NavBarComponent {

    public static readonly imports = [
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatMenuModule,
        MatDialogModule,
        MatExpansionModule,
        MatButtonModule
    ];

    public routeLinks: any[] = [];

    public constructor(
        public dialog: MatDialog,
        private router: Router
    ) {
        this.initGlobalTabs();
    }

  initGlobalTabs(): void {
        this.routeLinks.push(
        {
            label: 'portalName',
            link: '/home',
            index: 0
        },
        {
            label: 'activities',
            link: '/list/activities',
            index: 1
        },
        {
            label: 'organisations',
            link: '/list/organisations',
            index: 2
        },
        {
            label: 'worthKnowing',
            link: '/worthknowing',
            index: 3
        },
        {
            label: 'blogs',
            link: '/list/blogs',
            index: 4
        });
  }

//   Just Prototyping
  getAccountRoutes(): any {
        return [{
            label: 'Persönlicher Daten',
            link: 'admin/',
            index: 0
        },
        {
            label: 'verwaltungsbereich',
            link: 'admin/',
            index: 1
        },
        {
            label: 'Abmelden',
            link: 'admin/',
            index: 2
        }];
    }

    openLanguageChooser(): void {
        const dialogRef = this.dialog.open(LangaugeChooserDialogComponent, {
          width: '50vw'
        });

        dialogRef.afterClosed().subscribe(result => {
        });
    }

    goToHome(): void {
        this.router.navigate(['/home']);
    }



}
