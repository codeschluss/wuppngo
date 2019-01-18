import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { OrganisationModel } from 'src/realm/organisation/organisation.model';


@Component({
    selector: 'organisation-card',
  styleUrls: ['organisation.component.scss'],
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
    this.router.navigate(['/view/organisations/', this.organisation.id]);
  }

}
