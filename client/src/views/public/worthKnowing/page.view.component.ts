import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageModel } from 'src/realm/page/page.model';

@Component({
    selector: 'page-view',
    templateUrl: 'page.view.component.html'
})

export class PageViewComponent implements OnInit {

  public static readonly imports = [];
  public page: PageModel;

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.page = this.route.snapshot.data.page;
  }

  public getCreationDate(dateString: string): string {
    return new Date(dateString.replace(' ', 'T')).toLocaleDateString('de-DE');
  }

}
