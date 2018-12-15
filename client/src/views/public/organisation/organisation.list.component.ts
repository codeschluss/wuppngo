import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrganisationProvider } from 'src/realm/organisation/organisation.provider';


@Component({
  styleUrls: ['organisation.component.scss'],
  templateUrl: 'organisation.list.component.html'
})

export class OrganisationListComponent {

  public static readonly imports = [];
  public organisations: any[];

  constructor(
    private route: ActivatedRoute,
    private organisationProvider: OrganisationProvider,
  ) {
    this.organisations = route.snapshot.data.organisations;
  }

}
