import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatBottomSheet, MatBottomSheetModule, MatCheckboxModule, MatSelectModule } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenProvider } from '@portal/core';
import { OrganisationProvider } from 'src/realm/organisation/organisation.provider';
import { UserModel } from 'src/realm/user/user.model';
import { UserProvider } from 'src/realm/user/user.provider';
import { InfoBottomComponent } from './info.bottomsheet.component';

@Component({
    templateUrl: 'register.component.html'
})

export class RegisterComponent {

    static readonly imports = [
        MatSelectModule,
        MatBottomSheetModule,
        MatCheckboxModule
    ];

    userName: string = '';
    password: string = '';
    passwordRepeat: string;
    fullName: string;
    phone: string;
    isBlogger: boolean;

    error: string;
    organisationsCtrl = new FormControl();
    organisations: any[];

    constructor(
        private router: Router,
        private tokenProvider: TokenProvider,
        private _location: Location,
        private route: ActivatedRoute,
        private userProvider: UserProvider,
        private organisationProvider: OrganisationProvider,
        private bottomSheet: MatBottomSheet
        ) {
          this.organisationProvider.readAll().subscribe(orgas => {
            this.organisations = orgas;
            this.organisations.unshift({
                name: 'orgaDoesNotExist',
                id: 'orgaDoesNotExist'});
          });
        }

    register(): void {
        const user = new UserModel;
        user.name = this.fullName;
        user.password = this.password;
        user.phone = this.phone;
        user.applyBlogger = this.isBlogger;
        user.username = this.userName;
        user.organisations = this.organisationsCtrl.value;
        this.userProvider.create(user).subscribe(() => {
            this.tokenProvider.login(this.userName, this.password).subscribe(
                () => {
                    if (this.organisationsCtrl &&
                        this.organisationsCtrl.value &&
                        this.organisationsCtrl.value.find
                        (entry => entry.id === 'orgaDoesNotExist')) {
                      this.openBottomSheet('createMissingOrganisation');
                      this.goToCreateOrganisation();
                    } else {
                      this.openBottomSheet('successfullRegister');
                      this.goToLogin();
                    }
                }
            );
        },
        error => {
            this.error = error;
            console.log(error);
        });
    }

    goToLogin(): void {
        this.router.navigate(['/admin/login']);
    }

    goToCreateOrganisation(): void {
        this.router.navigate(['/admin/edit/organisation/new']);
    }

    goToHome(): void {
        this.router.navigate(['/home']);
    }

    openBottomSheet(message: string): void {
        this.bottomSheet.open(InfoBottomComponent,
            { data: { message: message} });
    }

    back(): void {
        this._location.back();
    }
}
