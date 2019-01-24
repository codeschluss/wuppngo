import { Injectable, Type } from '@angular/core';
import { CrudLink, CrudMethods, CrudProvider } from '@portal/core';
import { empty, Observable } from 'rxjs';
import { BaseService } from 'src/api/base-service';
import { TopicControllerService } from 'src/api/services/topic-controller.service';
import { LanguageModel } from '../language/language.model';
import { PageModel } from '../page/page.model';
import { TopicModel } from './topic.model';

@Injectable({ providedIn: 'root' })
export class TopicProvider
  extends CrudProvider<BaseService, TopicModel> {

  protected linked: CrudLink[] = [
    {
      field: 'language',
      method: () => empty(),
      model: LanguageModel
    },
    {
      field: 'pages',
      method: this.service.topicControllerReadPagesResponse,
      model: PageModel
    },
    {
      field: 'translations',
      method: this.service.topicControllerReadTranslationsResponse,
      model: TopicModel
    }
  ];

  protected methods: CrudMethods = {
    create: this.service.topicControllerCreateResponse,
    delete: this.service.topicControllerDeleteResponse,
    readAll: this.service.topicControllerReadAllResponse,
    readOne: this.service.topicControllerReadOneResponse,
    update: this.service.topicControllerUpdateResponse
  };

  protected model: Type<TopicModel> = this.based(TopicModel);

  public constructor(
    protected service: TopicControllerService
  ) {
    super();
  }

  public create: (model: TopicModel) => Observable<any>;

  public update: (model: TopicModel) => Observable<any>;

  public delete: (id: string) => Observable<any>;

  public readOne: (id: string) => Observable<TopicModel>;

  public readAll: (params?: TopicControllerService
    .TopicControllerReadAllParams) => Observable<TopicModel[]>;

}