
import { CrudResolver, CrudGraph, CrudJoiner } from '@portal/core';
import { OrganisationModel } from 'src/realm/organisation/organisation.model';
import { tap, map, mergeMap } from 'rxjs/operators';
import { StrictHttpResponse } from 'src/api/strict-http-response';
import { PageEvent } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { OrganisationProvider } from 'src/realm/organisation/organisation.provider';

@Component({
  styleUrls: ['organisation.component.scss'],
  templateUrl: 'organisation.list.component.html'
})

export class OrganisationListComponent implements OnInit {

  public static readonly imports = [];
  public organisations: OrganisationModel[];
  public pageNumber: number = 0;
  public totalSize: number = 100;
  public pageSize: number = 10;
  public sort: string;
  public pageSizeOptions: number[] = [5, 10, 25, 100];

  private graph: CrudGraph = CrudJoiner.of(OrganisationModel)
    .with('address').yield('suburb').graph;

  constructor(
    private organisationProvider: OrganisationProvider,
    private crudResolver: CrudResolver
    ) {}

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
        this.totalSize = response.body.page.totalElements;
        this.pageNumber = response.body.page.number;
        this.pageSize = response.body.page.size;
      }

      // public loadList(): void {
      //   this.organisations = [];
      //   this.organisationProvider.system.call(
      //     this.organisationProvider.system.methods.readAll,
      //     {
      //       size: this.pageSize,
      //       page: this.pageNumber,
      //       sort: 'name'
      //     }
      //   ).pipe(
      //     tap((response) => this.scroll(response as any)),
      //     map((response) => this.organisationProvider.system.cast(response)))
      //     .subscribe((response: any) => response.map((orga) =>
      //     this.crudResolver.run(orga,
      //       CrudJoiner.of(OrganisationModel)
      //       .with('address')
      //       .yield('suburb').graph.nodes).then(
      //         resolvedOrganisation => {
      //           this.organisations.push(resolvedOrganisation);
      //         }
      //       )
      //     ));
      // }

      // public resolveData(orga: any): any {
      //   let organisation: any;
      //   this.crudResolver.run(orga,
      //     CrudJoiner.of(OrganisationModel)
      //     .with('address')
      //     .yield('suburb').graph.nodes).then(
      //       resolvedOrganisation => {
      //         organisation = resolvedOrganisation;
      //       }
      //     );
      //     return organisation;
      // }

      // private scroll(response: StrictHttpResponse<any>) {
      //   this.totalSize = response.body.page.totalElements;
      //   this.pageNumber = response.body.page.number;
      //   this.pageSize = response.body.page.size;
      // }

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

      moreEntriesExist(): boolean {
        return (this.pageNumber + 1) * this.pageSize <= this.totalSize;
      }

      public onPageChange(event: any): void {
        this.organisations = null;
        this.pageNumber = event.pageIndex;
        this.basic();
        this.complex();
      }
}
