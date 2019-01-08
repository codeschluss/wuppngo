import { Component, Input } from '@angular/core';
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

  constructor() {}

}
