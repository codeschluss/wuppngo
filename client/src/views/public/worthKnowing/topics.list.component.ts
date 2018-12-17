import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TopicModel } from 'src/realm/topic/topic.model';

@Component({
    selector: 'topics-list-component',
    styleUrls: ['pages.component.css'],
    templateUrl: 'topics.list.component.html'
})

export class TopicsListComponent implements OnInit {

  public static readonly imports = [];

  public topics: TopicModel[];

  constructor(
    private route: ActivatedRoute,
    private roter: Router
  ) {}

  ngOnInit(): void {
    this.topics = this.route.snapshot.data.topics;
  }

  public openTopic(topicId: string) {
    this.roter.navigate(['/view/topic/' + topicId]);
  }

}
