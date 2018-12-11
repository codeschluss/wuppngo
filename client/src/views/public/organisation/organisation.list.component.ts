import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  styleUrls: ['organisation.component.scss'],
  templateUrl: 'organisation.list.component.html'
})

export class OrganisationListComponent {

  public static readonly imports = [];
  public organisations: any[];

  constructor(route: ActivatedRoute) {
    this.organisations = route.snapshot.data.organisations;
  }

}
