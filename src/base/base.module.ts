import { Injector, NgModule, Type } from '@angular/core';
import { BaseService, CoreModule, CoreSettings, CrudModel, CrudProvider } from '@wooportal/core';
import { ApiConfiguration } from '../api/api-configuration';
import { ClientManifest } from '../utils/manifest';
import { ClientPackage } from '../utils/package';
import { ActivityProvider } from './providers/activity.provider';
import { AddressProvider } from './providers/address.provider';
import { BlogProvider } from './providers/blog.provider';
import { CategoryProvider } from './providers/category.provider';
import { ConfigurationProvider } from './providers/configuration.provider';
import { LanguageProvider } from './providers/language.provider';
import { OrganisationProvider } from './providers/organisation.provider';
import { PageProvider } from './providers/page.provider';
import { ProviderProvider } from './providers/provider.provider';
import { SuburbProvider } from './providers/suburb.provider';
import { TagProvider } from './providers/tag.provider';
import { TargetGroupProvider } from './providers/target-group.provider';
import { TopicProvider } from './providers/topic.provider';
import { UserProvider } from './providers/user.provider';

const providers: Type<CrudProvider<BaseService, CrudModel>>[] = [
  ActivityProvider,
  AddressProvider,
  BlogProvider,
  CategoryProvider,
  ConfigurationProvider,
  LanguageProvider,
  OrganisationProvider,
  PageProvider,
  ProviderProvider,
  SuburbProvider,
  TagProvider,
  TargetGroupProvider,
  TopicProvider,
  UserProvider
];

@NgModule({
  imports: [
    CoreModule
  ]
})

export class BaseModule {

  public constructor(
    apiConfiguration: ApiConfiguration,
    coreSettings: CoreSettings,
    injector: Injector
  ) {
    apiConfiguration.rootUrl = ClientPackage.config.api.rootUrl;

    coreSettings.apiAuthUrl = ClientPackage.config.api.authUrl;
    coreSettings.apiRefreshUrl = ClientPackage.config.api.refreshUrl;
    coreSettings.apiRootUrl = ClientPackage.config.api.rootUrl;
    coreSettings.rootUrl = ClientManifest.startUrl;
    coreSettings.title = ClientManifest.shortTitle;

    providers.forEach((provider) => injector.get(provider));
  }

}