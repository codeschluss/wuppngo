import { Component, OnChanges } from '@angular/core';
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
import { SessionModel, SessionProvider, TokenProvider } from '@portal/core';

@Component({
    selector: 'navbar-component',
    styleUrls: ['layout.component.scss'],
    templateUrl: 'navbar.component.html'
})

export class NavBarComponent implements OnChanges {

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
    public accountRouts: any[] = [];
    public open = false;
    private token;

    public constructor(
        public dialog: MatDialog,
        private router: Router,
        private session: TokenProvider
        ) {
        this.router.events.subscribe(() => {
            this.close();
        });
        this.initGlobalTabs();
        this.session.value.subscribe((next) => {
            this.token = next.access;
          });
        this.initAccountRouts();
    }

    ngOnChanges(): void {
        this.session.value.subscribe((next) => {
            this.token = next.access;
          });
        this.initAccountRouts();
    }

  initGlobalTabs(): void {
        this.routeLinks.push(
        {
            label: 'portalName',
            link: '/home',
        },
        {
            label: 'activities',
            link: '/list/activities',
        },
        {
            label: 'organisations',
            link: '/list/organisations',
        },
        {
            label: 'worthKnowing',
            link: '/list/topics',
        },
        {
            label: 'blogs',
            link: '/list/blogs',
        });
  }

//   Just Prototyping
  initAccountRouts() {
    if (this.token && this.token.sub) {
        this.accountRouts = [
        {
            label: 'Hi, ' + this.token.sub,
            link: '/home',
        },
        {
            label: 'personalData',
            link: '/admin',
        },
        {
            label: 'logOut',
            link: '/logout',
        }];
        if (this.token.superuser) {
            this.accountRouts.push(
            {
                label: 'adminArea',
                link: '/admin/application',
            });
        }
    } else {
        this.accountRouts = [{
            label: 'login',
            link: '/login',
        }];
    }}

    openLanguageChooser(): void {
        const dialogRef = this.dialog.open(LangaugeChooserDialogComponent, {
          width: '50vw'
        });

        dialogRef.afterClosed().subscribe(result => {
        });
    }

    navigateTo(route: string): void {
        this.router.navigate([route]);
    }

    goToHome(): void {
        this.router.navigate(['/home']);
        this.close();

    }

    close(): void {
        this.open = false;
    }



}
