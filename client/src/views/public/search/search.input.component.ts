import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrganisationProvider } from 'src/realm/organisation/organisation.provider';
import { ActivityProvider } from 'src/realm/activity/activity.provider';

@Component({
    selector: 'search-input',
    styleUrls: [],
    templateUrl: 'search.input.component.html'
})

export class SearchInputComponent {

    public query: string;

    constructor(
        private router: Router,
    ) {}

    onSubmit(): void {
        if (this.query) {
            this.router.navigate(['/search/', this.query]);
        }
    }

}
