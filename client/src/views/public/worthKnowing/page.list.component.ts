import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { PageModel } from 'src/realm/page/page.model';

@Component({
    selector: 'pages-list',
    templateUrl: 'page.list.component.html',
    styleUrls: ['pages.component.css']
})

export class PageListComponent {

  @Input()
  public pages: PageModel[];

  constructor(
      private router: Router
  ) {
    moment.locale('de');
  }

  public toPage(pageID: string) {
    this.router.navigate(['/view/page/' + pageID]);
  }

  public getCreationDate(date: string): string {
    return moment(date).format('L');
  }

}
