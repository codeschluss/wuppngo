import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'search-component',
    styleUrls: ['search.component.scss'],
    templateUrl: 'search.component.html'
})

export class SearchComponent {

  public static readonly imports = [ MatTabsModule ];

  public query: string;

  constructor(
    route: ActivatedRoute
  ) {
    route.paramMap.pipe(
      switchMap((params: ParamMap) => this.query = params.get('query'))
    ).subscribe();
  }


}
