
import { CrudResolver, CrudGraph, CrudJoiner } from '@portal/core';
import { OrganisationModel } from 'src/realm/organisation/organisation.model';
import { tap, map, mergeMap } from 'rxjs/operators';
import { StrictHttpResponse } from 'src/api/strict-http-response';
import { Component, OnInit } from '@angular/core';
import { OrganisationProvider } from 'src/realm/organisation/organisation.provider';
import { ListComponent } from 'src/views/list.component';

@Component({
  styleUrls: ['organisation.component.scss'],
  templateUrl: 'organisation.list.component.html'
})

export class OrganisationListComponent extends ListComponent implements OnInit {

  public static readonly imports = [];
  public organisations: OrganisationModel[];

  private graph: CrudGraph = CrudJoiner.of(OrganisationModel)
    .with('address').yield('suburb').graph;

  constructor(
    private organisationProvider: OrganisationProvider,
    private crudResolver: CrudResolver
    ) {
      super();
    }

      ngOnInit(): void {
        this.basic();
        this.complex();
      }

      private basic(): void {
          this.organisationProvider.readAll({
            page: this.pageNumber,
            size: this.pageSize,
            sort: 'name'
          }).pipe(mergeMap(
            (orgas: any) => this.crudResolver.refine(orgas, this.graph))
        ).subscribe((orgas: any) => console.log('basic', orgas));
      }

      private complex(): void {
        const provider = this.organisationProvider.system;
        provider.call(provider.methods.readAll, {
          page: this.pageNumber,
          size: this.pageSize,
          sort: 'name'
        }).pipe(
          tap((response) => this.intercept(response as any)),
          map((response) => provider.cast(response)),
          mergeMap((orgas: any) => this.crudResolver.refine(orgas, this.graph))
        ).subscribe((orgas: any) => this.organisations = orgas);
      }

      private intercept(response: StrictHttpResponse<any>) {
        this.totalPages = response.body.page.totalPages;
        this.pageNumber = response.body.page.number;
        this.pageSize = response.body.page.size;
      }

      nextPage(): void {
        this.organisations = null;
        this.pageNumber++;
        this.basic();
        this.complex();
      }

      previousPage(): void {
        this.organisations = null;
        this.pageNumber--;
        this.basic();
        this.complex();
      }

}
