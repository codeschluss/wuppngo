import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'search-input',
    styleUrls: [],
    templateUrl: 'search.input.component.html'
})

export class SearchInputComponent {

    public query: string;

    constructor(
        private router: Router
    ) {}

    onSubmit(): void {
        if (this.query) {
            this.router.navigate(['/public/search/', this.query]);
        }
    }

}
