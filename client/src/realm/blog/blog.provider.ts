import { Injectable } from '@angular/core';
import { CrudProvider } from '@portal/core';
import { Observable } from 'rxjs';
import { BlogControllerService } from '../../api/services/blog-controller.service';
import { BlogModel } from './blog.model';

@Injectable({ providedIn: 'root' })
export class BlogProvider
  extends CrudProvider<BlogControllerService, BlogModel> {

  public create: (model: BlogModel) => Observable<any>;

  public update: (id: string, model: BlogModel) => Observable<any>;

  public delete: (id: string) => Observable<any>;

  public readOne: (id: string) => Observable<BlogModel>;

  public readAll: (params?: BlogControllerService
    .BlogControllerReadAllParams) => Observable<BlogModel[]>;

  protected linked = [];

  protected methods = {
    create: this.service.blogControllerCreateResponse,
    delete: this.service.blogControllerDeleteResponse,
    readAll: this.service.blogControllerReadAllResponse,
    readOne: this.service.blogControllerReadOneResponse,
    translate: this.service.blogControllerReadTranslationsResponse,
    update: this.service.blogControllerUpdateResponse
  };

  protected model = this.based(BlogModel);

  public constructor(
    protected service: BlogControllerService
  ) {
    super();
  }

}