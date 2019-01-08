import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
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
  ) {}

  public toPage(pageID: string) {
    this.router.navigate(['/view/page/' + pageID]);
  }

  public getCreationDate(dateString: string): string {
    return new Date(dateString.replace(' ', 'T')).toLocaleDateString('de-DE');
  }

}
