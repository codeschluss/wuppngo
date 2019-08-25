import { AfterViewInit, Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CrudJoiner, CrudResolver, TokenProvider } from '@wooportal/core';
import { merge } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { OrganisationModel } from '../../../../realm/models/organisation.model';
import { UserModel } from '../../../../realm/models/user.model';
import { UserProvider } from '../../../../realm/providers/user.provider';
import { ClientPackage } from '../../../../utils/package';
import { BasePage } from '../base.page';

@Component({
  styleUrls: ['../base.page.scss', 'register.page.scss'],
  templateUrl: 'register.page.html'
})

export class RegisterPageComponent extends BasePage implements AfterViewInit {

  public boxes: any = {
    createOrganisation: false,
    joinBloggers: false
  };

  public fullname: FormControl = new FormControl(null, [
    Validators.required
  ]);

  public joinOrganisations: FormControl = new FormControl(null, [
    Validators.nullValidator
  ]);

  public password: FormControl = new FormControl(null, [
    Validators.minLength(10),
    Validators.pattern(/(?=(?:[^0-9]*[0-9]){2})/),
    Validators.pattern(/(?=(?:[^A-Z]*[A-Z]){2})/),
    Validators.pattern(/(?=(?:[^a-z]*[a-z]){2})/),
    Validators.required
  ]);

  public passwordConfirm: FormControl = new FormControl(null, [
    Validators.minLength(10),
    Validators.pattern(/(?=(?:[^0-9]*[0-9]){2})/),
    Validators.pattern(/(?=(?:[^A-Z]*[A-Z]){2})/),
    Validators.pattern(/(?=(?:[^a-z]*[a-z]){2})/),
    Validators.required
  ]);

  public phone: FormControl = new FormControl(null, [
    Validators.required
  ]);

  public username: FormControl = new FormControl(null, [
    Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
    Validators.required
  ]);

  protected path: string = 'register';

  public get organisations(): OrganisationModel[] {
    return this.route.snapshot.data.organisations;
  }

  public get title(): string {
    return ClientPackage.config.defaults.title;
  }

  public get valid(): boolean {
    return true
      && this.fullname.valid
      && this.password.valid
      && this.passwordConfirm.valid
      && this.phone.valid
      && this.username.valid;
  }

  protected get routing(): Route {
    return {
      path: this.path,
      resolve: {
        organisations: CrudResolver
      },
      data: {
        resolve: {
          organisations: CrudJoiner.of(OrganisationModel, { approved: true })
        }
      }
    };
  }

  public constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tokenProvider: TokenProvider,
    private userProvider: UserProvider
  ) {
    super();
  }

  public ngAfterViewInit(): void {
    this.passwordConfirm.disable();

    merge(
      this.password.valueChanges,
      this.passwordConfirm.valueChanges
    ).subscribe(() => this.validate());
  }

  public register(): void {
    const user = new UserModel();
    user.applyBlogger = this.boxes.joinBloggers;
    user.name = this.fullname.value;
    user.organisationRegistrations = this.joinOrganisations.value;
    user.password = this.password.value;
    user.phone = this.phone.value;
    user.username = this.username.value;

    this.userProvider.create(user).pipe(
      mergeMap(() => this.tokenProvider.login(user.username, user.password)),
      map((tokens) => tokens.access.id)
    ).subscribe((userId) => this.router.navigate(
      this.boxes.createOrganisation
        ? ['/', 'admin', 'edit', 'organisations', 'new']
        : ['/', 'admin', 'account', userId]
    ));
  }

  private validate(): void {
    const ctrl1 = this.password;
    const ctrl2 = this.passwordConfirm;

    if (ctrl1.value && ctrl2.disabled) {
      ctrl2.enable({ emitEvent: false });
    }

    if (!ctrl1.value && ctrl2.enabled) {
      ctrl2.patchValue(null, { emitEvent: false });
      ctrl2.disable({ emitEvent: false });
    }

    if (ctrl1.value && ctrl2.enabled && ctrl1.value !== ctrl2.value) {
      ctrl1.setErrors({ missmatch: true });
      ctrl2.setErrors({ missmatch: true });
    } else {
      ctrl1.updateValueAndValidity({ emitEvent: false });
      ctrl2.updateValueAndValidity({ emitEvent: false });
    }
  }

}
