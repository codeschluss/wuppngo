import { Component } from '@angular/core';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatBottomSheet } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionProvider } from '@portal/core';
import { UserProvider } from 'src/realm/user/user.provider';
import { InfoBottomComponent } from './info.bottomsheet.component';

@Component({
    templateUrl: 'login.component.html'
})

export class LoginComponent {

    static readonly imports = [
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule];

    userName: string = '';
    password: string = '';
    error: string;

    constructor(
        private router: Router,
        private session: SessionProvider,
        private userProvider: UserProvider,
        private bottomSheet: MatBottomSheet) {
            if (this.router.url.endsWith('logout')) {
                this.session.logout();
            }
        }

    login(): void {
        this.session.login(this.userName, this.password).subscribe(
            () => {
                this.bottomSheet.open(InfoBottomComponent,
                    { data: { message: 'successfullLoggedIn' } });
                    this.goToHome();
            },
            error => {
                if (error.error && error.error.message) {
                    this.error = error.error.message.toLowerCase();
                } else {
                    this.error = error.statusText.toLowerCase();
                }
            });
    }

    resetPassword(): void {
        if (this.userName) {
            this.userProvider.resetPassword(this.userName).subscribe(() => {
                this.bottomSheet.open(InfoBottomComponent,
                    { data: { message: 'successfullResetPassword' } });
            },
            () => { this.bottomSheet.open(InfoBottomComponent,
                    { data: { message: 'genericErrorMessage' } });
            }
            );
        }
    }

    goToHome(): void {
        this.router.navigate(['/admin/account/']);
    }

    goToRegister(): void {
        this.router.navigate(['/register']);
    }
}
