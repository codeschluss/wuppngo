import { Component, OnChanges } from '@angular/core';
import { MatButtonModule, MatDialog, MatDialogModule, MatExpansionModule, MatFormFieldModule, MatInputModule, MatMenuModule, MatToolbarModule } from '@angular/material';
import { Router } from '@angular/router';
import { TokenProvider } from '@portal/core';
import { ConfigurationProvider } from 'src/realm/configuration/configuration.provider';
import { LangaugeChooserDialogComponent } from './languagecooser.component';

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
    public portalName;

    public constructor(
        public dialog: MatDialog,
        private router: Router,
        private tokenProvider: TokenProvider,
        private configProvider: ConfigurationProvider
        ) {
        this.router.events.subscribe(() => {
            this.close();
        });
        this.configProvider.readAll()
        .subscribe(configs => {
            this.portalName = configs.find(
                config => config.item === 'portalName').value;
                this.initGlobalTabs();
        });
        this.tokenProvider.value.subscribe((next) => {
            this.token = next.access;
          });
        this.initAccountRouts();
    }

    ngOnChanges(): void {
        this.tokenProvider.value.subscribe((next) => {
            this.token = next.access;
          });
        this.initAccountRouts();
    }

  initGlobalTabs(): void {
        this.routeLinks.push(
        {
            label: this.portalName,
            link: '/home',
        },
        {
            label: 'timer',
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
