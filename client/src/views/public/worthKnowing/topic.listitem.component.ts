import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TopicModel } from 'src/realm/topic/topic.model';

@Component({
    selector: 'topic-list-item',
    templateUrl: 'topic.listitem.component.html',
    styleUrls: ['pages.component.css']
})

export class TopicListItemComponent {

  @Input()
  public topic: TopicModel;
  public panelOpenState = false;

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
