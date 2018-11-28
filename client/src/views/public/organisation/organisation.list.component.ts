import { Component } from '@angular/core';
import { OrganisationModel } from 'src/core/models/organisation.model';
import { AddressModel } from 'src/core/models/address.model';
import { SuburbModel } from 'src/core/models/suburb.model';


@Component({
  styleUrls: ['organisation.component.css'],
  templateUrl: 'organisation.list.component.html'
})

export class OrganisationListComponent {

  public static readonly imports = [];
  public organisations: OrganisationModel[] = [];

  constructor(
  ) {
    for (let i = 0; i < 20; i++) {
      this.organisations.push(this.buildTestData());
    }
  }

  buildTestData(): OrganisationModel {
    const organisation = new OrganisationModel();

    organisation.id = 'testActivity';
    organisation.name = 'FakeActivity';
    organisation.mail = 'FakeActivity@internet.de';

    organisation.description = 'This is just a FakeActivity to show'
      + 'how this could look like.';
    const testAddress = new AddressModel();
    testAddress.street = 'samplestreet';
    testAddress.houseNumber = '42a';
    testAddress.latitude = 51.00;
    testAddress.longitude = 7.00;
    testAddress.postalCode = '63628';

    const testSubUrb = new SuburbModel();
    testSubUrb.name = 'Elberfeld';
    testSubUrb.id = '1';

    testAddress.suburb = new Promise<SuburbModel>((resolve, reject) => {
      resolve(testSubUrb);
    });

    testAddress.place = 'SampleCity';
    organisation.address = new Promise<AddressModel>((resolve, reject) => {
      resolve(testAddress);
    });

    return organisation;
  }

}
