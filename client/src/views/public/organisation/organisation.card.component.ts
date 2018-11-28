import { Component, Input } from '@angular/core';

import { AddressModel } from 'src/core/models/address.model';
import { OrganisationProvider } from 'src/core/providers/organisation.provider';
import { OrganisationModel } from 'src/core/models/organisation.model';
import { Router } from '@angular/router';

@Component({
    selector: 'organisation-card',
  styleUrls: ['organisation.component.css'],
  templateUrl: 'organisation.card.component.html'
})

export class OrganisationCardComponent {

  public static readonly imports = [];

  @Input()
  organisation: OrganisationModel;

  constructor(
    private router: Router
  ) {}

  openOrganisationView(): void {
    this.router.navigate(['/public/organisations/view/', this.organisation.id]);
  }

}
