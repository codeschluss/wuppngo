import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'search-result-list',
  styleUrls: ['search.component.scss'],
  templateUrl: 'searchresult.list.component.html'
})
export class SearchListComponent {

@Input()
public results: any[];

@Input()
public modelType: string;

public panelOpenState: boolean = false;

  constructor(
    private router: Router,
    ) {}

    public toReult(id: string): void  {
        this.router.navigate(['/view/' + this.modelType, id]);
    }
}
