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

  getOrgaImg(): string {
    if (this.organisation.images && this.organisation.images[0]) {
      const image = this.organisation.images[0];
      return 'data:' + image.mimeType + ';base64,'
      + atob(image.imageData.toString());
    } else {
      return 'imgs/placeHolder.jpg';
    }
  }

  getHeadLineFontSize(name: string): string {
    if (name.length >= 20) {
      return '1.5em';
    }
    if (name.length > 10 && name.length < 20) {
      return '2em';
    }
    if (name.length <= 10) {
      return '2.5em';
    }

  }

}
